import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoggleGuard } from './Auth/guards/google.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
    @UseGuards(AuthGuard('google'))
    async goggleAuth(@Req()req){
        
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    goggleAuthRedirect(@Req()req){
        return this.appService.goggleLogin(req)

    }
}
