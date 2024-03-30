import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.deleteOne({ _id: id }).exec();
    return deletedUser;
  }

  async update(body: UpdateUserDto, id: string) {
    try {
      await this.userModel.updateOne({ _id: id }, body).exec();
      return this.findOne(id);
    } catch (error) {
      return 'Update did not succeed!';
    }
  }
}
