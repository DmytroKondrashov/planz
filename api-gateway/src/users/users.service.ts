import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';
import { SearchUserDto } from './dto/search.user.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(body: SearchUserDto): Promise<UserDto[]> {
    return this.commonService.turnDocumentsToObjects(
      this.userModel.find(body).exec(),
      false,
    );
  }

  async findOne(id: string) {
    const res = await this.userModel.findOne({ _id: id }).exec();
    return this.commonService.turnDocumentsToObjects(res, true);
  }

  async delete(id: string): Promise<string> {
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

  async update(body: UpdateUserDto, id: string): Promise<UserDto | string> {
    try {
      await this.userModel.updateOne({ _id: id }, body).exec();
      return (await this.findOne(id)).toObject();
    } catch (error) {
      return 'Update did not succeed!';
    }
  }
}
