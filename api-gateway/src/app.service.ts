import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginEvent } from './login.event.dto';
import { Observable } from 'rxjs';
import { Consumer, Producer } from 'kafkajs';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  private kafkaProducer: Producer;
  private kafkaConsumer: Consumer;

  async getHello() {
    // This will work, but it will return the event instead of event data.
    // return new Observable((observer) => {
    //   this.authClient
    //     .emit('login_request', new LoginEvent('test', 'test'))
    //     .subscribe((response) => {
    //       console.log('Received response from auth microservice:', response);
    //       observer.next(response);
    //       observer.complete();
    //     });
    // });



    // This will not work
    // Publish message to Kafka topic
    // const kafkaMessage = { key: 'request_key', value: JSON.stringify('') };
    // await this.kafkaProducer.send({
    //   topic: 'microservice_topic',
    //   messages: [kafkaMessage],
    // });

    // // Return a Promise that resolves when response is received
    // return new Promise((resolve, reject) => {
    //   // Subscribe to Kafka topic for response
    //   const subscription =
    //     this.kafkaConsumer.subscribeToResponseOf('microservice_topic');

    //   // Handle response when received
    //   subscription.subscribe({
    //     next: (message) => {
    //       const responseData = JSON.parse(message.value.toString());
    //       resolve(responseData);
    //       subscription.unsubscribe(); // Unsubscribe after receiving response
    //     },
    //     error: (error) => {
    //       reject(error);
    //       subscription.unsubscribe(); // Unsubscribe on error
    //     },
    //   });
    // });
  }
}
