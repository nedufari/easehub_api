import { AuthGuard } from "@nestjs/passport";

export class GoggleGuard extends AuthGuard('google'){
    constructor(){
        super()
    }
}