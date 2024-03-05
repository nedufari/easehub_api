import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuestEntity } from '../../Entity/guests.entity';
import { GuestRepository, NotificationsRepository } from './guests.repository';
import { RegisterGuestsDto } from './guestDto/guest.dto';
import { Notifications } from '../../Entity/notifications.entity';
import {
  ComingAlongWithSomeone,
  GuestsStatus,
  NotificationType,
} from '../../Enums/enums';
import { customAlphabet } from 'nanoid';
import { Mailer } from '../../mailer/mailer.service';
import { IGuests } from './guests';
import { AdminRepository, EventDetailsRepsository } from '../admin/admin.repository';
import { AdminEntity } from '../../Entity/admin.entity';
import { EventDetailsEntity } from 'src/Entity/eventdetails.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(GuestEntity) private guestripo: GuestRepository,
    @InjectRepository(Notifications)
    private notificationripo: NotificationsRepository,
    @InjectRepository(AdminEntity) private readonly adminripo: AdminRepository,
    @InjectRepository(EventDetailsEntity) private readonly eventdetailsripo: EventDetailsRepsository,
    private mailerservice: Mailer,
  ) {}

  public generateAccessCode(): string {
    const nanoid1 = customAlphabet('1234567890', 6);
    return nanoid1();
  }

  //register guests

  async RegisterGuests(dto: RegisterGuestsDto,evenndetailsid:string): Promise<{ message: string }> {
    const verifyemail = await this.guestripo.findOne({
      where: { email: dto.email },
    });
    if (verifyemail)
      throw new HttpException(
        'you are already on the guest list for this event',
        HttpStatus.FOUND,
      );


    //set the event details field 
    const eventdetailsinfo= await this.eventdetailsripo.findOne({where:{id:evenndetailsid}})
    if (!eventdetailsinfo) throw new HttpException('evebtdetails does not match',HttpStatus.NOT_FOUND)


    const guest = new GuestEntity();
    guest.email = dto.email;
    guest.fullname = dto.fullname;
    guest.phone = dto.phone;
    guest.registration_date = new Date();
    guest.Isregistered = true;
    guest.status = GuestsStatus.UNATTENDED_TO;
    guest.access_code = this.generateAccessCode();
    guest.eventDetails = eventdetailsinfo


    guest.coming_with_any_other = dto.coming_with_any_other;

    // If there is a company
    if (dto.coming_with_any_other === ComingAlongWithSomeone.YES) {
      // Check if both amount and names are provided
      if (!dto.amount || !dto.names) {
        throw new HttpException(
          'The amount of the extra people coming and their names are required, please',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      // Check if the number of names does not exceed the amount
      if (dto.names.length > dto.amount) {
        throw new HttpException(
          'The number of names cannot exceed the provided amount',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      // Check if the number of names is not less than the amount
      if (dto.names.length < dto.amount) {
        throw new HttpException(
          'The number of names cannot be less than the provided amount',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      guest.amount = dto.amount;
      guest.names = dto.names;
      guest.table_amount =200 

    }

   


    //allocate seats and tables
    await this.allocatetable([guest],eventdetailsinfo.table_amount);

    await this.guestripo.save(guest);

    //forward the mail
    await this.mailerservice.SendAccessCodeMail(
      guest.email,
      guest.access_code,
      guest.fullname,
      eventdetailsinfo.event_title,
      eventdetailsinfo.event_location,
      eventdetailsinfo.event_time,
      guest.tables
    );

    //set notification
    const notification = new Notifications();
    notification.account = guest.id;
    notification.subject = 'New Guest registered!';
    notification.notification_type = NotificationType.GUEST_REGISTERED;
    notification.message = ` ${guest.fullname},  has successfully been added to the guest list`;
    await this.notificationripo.save(notification);

    return {
      message:
        'new guest added to the guest list, please check your mail for the event invite ',
    };
  }

  async getall(): Promise<IGuests[]> {
    const findall = await this.guestripo.find();
    return findall;
  }

  private async allocatetable(guests: GuestEntity[], numberOfTables: number): Promise<void> {
    // Define the amount of seats per table
    const maxNumberOfSeatsPerTable = 10;

    // Calculate the total available seats based on the number of tables
    const totalAvailableSeats = numberOfTables * maxNumberOfSeatsPerTable;

    // Initialize variables
    let remainingSeats = totalAvailableSeats;

    // Iterate through each guest
    for (const guestToAllocate of guests) {
        // If the guest is not allocated to any table or the current table is full
        if (!guestToAllocate.tables || remainingSeats === 0) {
            // Create a new table only if there are remaining seats
            if (remainingSeats > 0) {
                const allocatedTableNumber = numberOfTables - (remainingSeats / maxNumberOfSeatsPerTable) + 1;
                guestToAllocate.tables = [allocatedTableNumber.toString()];
                remainingSeats -= 1;
            } else {
                // Handle the case where there are no more seats available
                throw new HttpException(
                    'No more seats available. Please contact the event planner.',
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        } else {
            // Check if the current table is not full
            if (guestToAllocate.tables.length < maxNumberOfSeatsPerTable) {
                const allocatedTableNumber = parseInt(guestToAllocate.tables[0]); // Assuming the table number is stored as a string
                // Allocate the guest to the current table
                guestToAllocate.tables.push((allocatedTableNumber).toString());
                remainingSeats -= 1; // Decrement remaining seats
            } else {
                // If the current table is full, create a new table
                const allocatedTableNumber = numberOfTables - (remainingSeats / maxNumberOfSeatsPerTable) + 1;
                guestToAllocate.tables = [allocatedTableNumber.toString()];
                remainingSeats -= 1;
            }
        }
    }
}

}
