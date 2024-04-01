import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class CommonService {
  constructor(private readonly jwtService: JwtService) {}

  getIdFromToken(token: string) {
    const decoded = this.jwtService.verify(token);
    return decoded._id;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
