import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create.user.dto';
import { UsersService } from './users.service';
import { User } from '../common/schemas/user.schema';
import { UpdateUserDto } from './dto/update.user.dto';
import { SearchUserDto } from './dto/search.user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Body() body: SearchUserDto): Promise<User[]> {
    return this.usersService.findAll(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }

  @Post(':id')
  async edit(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<string | User> {
    return this.usersService.update(body, id);
  }
}
