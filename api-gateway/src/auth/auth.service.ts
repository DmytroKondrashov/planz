import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/common/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signIn(body: CreateUserDto): Promise<{ jwtToken: string }> {
    const users = await this.userService.findAll(body);
    const user = users[0];
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { _id: user._id, email: user.email };
    return {
      jwtToken: await this.jwtService.signAsync(payload, {
        secret: 'testSecret',
      }),
    };
  }
}
