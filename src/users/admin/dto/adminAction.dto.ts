import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { AccessLevels, Accreditation, AdminTypes, GuestType, VendorDepartment } from "../../../Enums/enums"

//create admin dto 
export class CreateAdminDto{
    @IsEnum(AdminTypes)
    @IsNotEmpty()
    admintype:AdminTypes

    @IsEnum(AccessLevels)
    @IsNotEmpty()
    accessLevel:AccessLevels

    @IsEmail()
    @IsNotEmpty({})
    email:string

    @IsString()
    @IsNotEmpty()
    name:string
}

export class UpgradeClearanceLevelDto{
    @IsEnum(AccessLevels)
    @IsNotEmpty()
    accessLevel:AccessLevels

}

export class ChangeAdmintypeDto{
    @IsEnum(AdminTypes)
    @IsNotEmpty()
    admintype:AdminTypes
}

export class AccreditationDto{
    @IsEnum(Accreditation)
    accreditate:Accreditation
}

export class distinguishGuestsDto{
    @IsEnum(GuestType)
    distinguish : GuestType
}

export class PrepareSystemDto{
   

    @IsString()
    @IsNotEmpty()
    event_location:string

    @IsString()
    @IsNotEmpty()
    event_venue:string

    @IsString()
    @IsNotEmpty()
    event_time:string

    @IsString()
    @IsNotEmpty()
    event_title:string

    @IsNumber()
    @IsNotEmpty()
    table_amount:number

    @IsNumber()
    @IsNotEmpty()
    expected_number_of_guest:number

    @IsNumber()
    @IsNotEmpty()
    number_of_vendors:number


    @IsArray()
    @IsNotEmpty()
    vendor:VendorDetailsDto[]

}
           
class VendorDetailsDto {

    @IsString()
    @IsNotEmpty()
    call_time: string;

    @IsNumber()
    @IsNotEmpty()
    number_of_staff: number;

    @IsString()
    @IsNotEmpty()
    brief_note: string;

    @IsEnum(VendorDepartment)
    @IsNotEmpty()
    department: VendorDepartment;

}