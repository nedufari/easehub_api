export enum GuestsStatus{
    CHECKED_IN = "checked_in",
    CHECKED_OUT = " checked_out",
    UNATTENDED_TO = "unattended_to"

}

export enum Accreditation{
    ACCREIDATED ="accreditated",
    DENIED = "denied",
    NOT_YET ="not_yet"
}

export enum AdminTypes{
    SUPER_ADMIN = "super_admin",
    REGISTRATION_ELF = "registration_elf",
    CORDINATOR = "cordinator",
    CLIENT = "client"
    

}

export enum Roles{
    SUPER_ADMIN = "super_admin",
    ADMIN ="admin",
    GUEST="guest",
    CORDINATOR="cordinator",
    USHER="usher",
    
}

export enum AccessLevels{
    HIGHEST_LEVEL ="highest_level",
    MID_LEVEL = "mid_level",
    LOWEST_LEVEL = "lowest_level"
}



export enum NotificationType{
    GUEST_REGISTERED =" guest_registered",
    GUEST_CHECKED_IN ="guest_checked_in",
    GUEST_DISTINGUISHED_AS ="guest_distinguihsed_as",
    QUEST_RECORDS_UPDATED ="guest_records_updated",
    QUEST_REMOVED_FROM_GUEST_LIST ="guest_removed_from_guest_list",
    SUPER_ADMIN_CREATED =" super_admin_created",
    OTHER_ADMIN_CREATED ="other_admin_created",
    OTHER_ADMIN_LOGGED_IN ="other_admin_logged_in",
    EMAIL_VERIFICATION = "email_verification",

    ADMIN_CREATED="admin_created",
    ADMIN_DELETED="admin_deleted",
    ADMIN_CLEARANCE_UPGRADED="admin_clearance_upgraded",
    ADMIN_PASSWORD_CHANGED="admin_password_changed",

    ADMIN_DOWNLOADED_AND_CLEARED_THE_GUEST_LIST="admin_downloaded_and_cleared_the_guest_list",
    ADMIN_DOWNLOADED_THE_GUEST_LIST="admin_downloaded_the_guest_list",




}

export enum ComingAlongWithSomeone{
    YES ="yes",
    NO ='no'
}

export enum GuestType{
    VIP ="vip",
    SPECIAL_CARE ="special_care",
    FAMILY = "family",
    NORMAL_GUEST ="normal_guest"    
}

export enum VendorDepartment{
    MAIN_CATERER = "main_caterer",
    BACKUP_CATERER = "backup_caterer",
    MAIN_CATERER_GROOM_SIDE = "main_caterer_groom_side",
    BACKUP_CATERER_GROOM_SIDE = "backup_caterer_groom_side",
    MAIN_CATERER_BRIDE_SIDE = "main_caterer_bride_side",
    BACKUP_CATERER_BRIDE_SIDE = "backup_caterer_bride_side",
    BACKUP_CATERER_GENERAL= "backup_caterer_general",
    DRIVERS_PACK ="driver's_pack",

    BOUNCERS ="boncers",

    SMALL_CHOPS_MAIN="small_chops_MAIN",
    SMALL_CHOPS_BACKUP="small_chops_BACKUP",
    DRINKS_AND_BAR ='drinks_and_bar',
    COCKTAILS_AND_MOCKTAILS ="cocktails_and_mocktails",
    DESSERTS_AND_CAKES ="deserts_and_cakes",
    
    

    
    
    



}


