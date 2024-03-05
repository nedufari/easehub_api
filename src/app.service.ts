import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 

  async goggleLogin(req){
    if(!req.user) throw new HttpException('no user from google',HttpStatus.NOT_FOUND)
    return {message:'user info from google', user:req.user}
}
}
