import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {
    this.kafkaClient.subscribeToResponseOf('login_request');
    this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  loginUser(data) {
    console.log(data);
    // return 'User was logged in!';
    return this.kafkaClient.send('login_request', 'User was logged in!');
  }
}
