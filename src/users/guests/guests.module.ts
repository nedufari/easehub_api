import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestEntity } from '../../Entity/guests.entity';
import { Notifications } from '../../Entity/notifications.entity';
import { Mailer } from '../../mailer/mailer.service';
import { AdminEntity } from '../../Entity/admin.entity';
import { EventDetailsEntity } from 'src/Entity/eventdetails.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Notifications,GuestEntity,AdminEntity,EventDetailsEntity])],
  controllers: [GuestsController],
  providers: [GuestsService,Mailer]
})
export class GuestsModule {}
