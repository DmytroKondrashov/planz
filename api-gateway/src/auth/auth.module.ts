import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/common.service';
import { ListsService } from 'src/lists/lists.service';
import { List, ListSchema } from 'src/lists/schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    // For some uncnown reason we DO NOT need to import JwtModule here!
    // If we do - that will provoce the arror in CommonService.getIdFromToken
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '24h' },
    // }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    CommonService,
    ListsService,
  ],
})
export class AuthModule {}
