import { Injectable } from "@nestjs/common"
import {PassportStrategy} from  "@nestjs/passport"
import {Strategy, VerifyCallBack} from "passport-google-oauth20"


@Injectable()
export class GoggleStratgy extends PassportStrategy(Strategy,'google'){
    constructor(){
        super({
            clientID: "691446841016-1tgl3btp067ci5ihckpp32lr187qk7dm.apps.googleusercontent.com",
            clientSecret: "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",
            callbackUrl:"http://localhost:3005/google/callback",
            scope:['email', 'profile']
        })
    }

    async validate(accesstoken:string, refreshToken:string, profile:any,done:VerifyCallBack):Promise<any>{
        const {name, email,photos}= profile
        const user ={
            email:email[0].value,
            firstname:name.givenName,
            lastname:name.familyName,
            picture:photos[0].value,
            accesstoken,
            
        }
        done(null,user)
    }
}