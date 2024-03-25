import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginEvent } from './login.event.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello() {
    this.authClient.emit('login_requiest', new LoginEvent('test', 'test'));
  }

  // createOrder({ userId, price }: CreateOrderRequest) {
  //   this.billingClient.emit(
  //     'order_created',
  //     new OrderCreatedEvent('123', userId, price),
  //   );
  // }
}
