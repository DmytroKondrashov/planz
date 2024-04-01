import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/common/dto/create.user.dto';
import { UserDto } from 'src/common/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto): Promise<{ jwtToken: string }> {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.authService.signUp(body);
  }
}
