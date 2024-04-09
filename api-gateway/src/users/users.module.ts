import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/schemas/user.schema';
import { CommonService } from 'src/common/common.service';
import { ListsService } from 'src/lists/lists.service';
import { List, ListSchema } from 'src/lists/schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CommonService, ListsService],
})
export class UsersModule {}
