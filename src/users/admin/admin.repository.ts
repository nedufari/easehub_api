import { EntityRepository, Repository } from "typeorm";
import { AdminEntity } from "../../Entity/admin.entity";
import { EventDetailsEntity } from "src/Entity/eventdetails.entity";

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository <AdminEntity>{}

@EntityRepository(EventDetailsEntity)
export class EventDetailsRepsository extends Repository <EventDetailsEntity>{}

