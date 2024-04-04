import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';
import { SearchUserDto } from './dto/search.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(body: SearchUserDto) {
    return this.userModel.find(body).exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    try {
      await this.userModel.deleteOne({ _id: id }).exec();
      // TODO: delete all the Lists that belong to this User
      return 'User successfully deleted!';
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during User deletion!',
      );
    }
  }

  async update(body: UpdateUserDto, id: string) {
    try {
      await this.userModel.updateOne({ _id: id }, body).exec();
      return (await this.findOne(id)).toObject();
    } catch (error) {
      return 'Update did not succeed!';
    }
  }
}
