import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './common/schemas/user.schema';
import { ListsModule } from './lists/lists.module';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';
import { ListsService } from './lists/lists.service';
import { List, ListSchema } from './lists/schemas/list.schema';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    AuthModule,
    UsersModule,
    ListsModule,
    MongooseModule,
    CommonModule,
    PlansModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    JwtService,
    UsersService,
    CommonService,
    ListsService,
  ],
})
export class AppModule {}
