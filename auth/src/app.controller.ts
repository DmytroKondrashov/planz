import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('login_request')
  async loginUser(data: any) {
    return this.appService.loginUser(data);
    // const loginResult = await this.appService.loginUser(data);
    // return this.authClient.emit('login_succesfull', loginResult);
  }
}
