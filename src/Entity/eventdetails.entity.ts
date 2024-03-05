import { VendorDepartment } from "src/Enums/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GuestEntity } from "./guests.entity";

@Entity('event_details')
export class EventDetailsEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    event_venue: string

    @Column()
    event_time: string

    @Column()
    event_location: string

    @Column()
    table_amount: number

    @CreateDateColumn()
    registration_date: Date

    @Column()
    created_by: string

    @Column()
    event_title: string

    @Column()
    expected_number_of_guest: number

    @Column()
    number_of_vendors:number

    @Column('jsonb',{nullable:true})
    vendors:VendorDetails[]

    @OneToMany(() => GuestEntity, guest => guest.eventDetails)
    guests: GuestEntity[];
    
}

interface VendorDetails{
    department:VendorDepartment
    number_of_staff:number,
    call_time :string,
    brief_note:string

}