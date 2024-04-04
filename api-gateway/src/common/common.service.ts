import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class CommonService {
  constructor(private readonly jwtService: JwtService) {}

  getIdFromToken(token: string): string {
    const decoded = this.jwtService.verify(token);
    return decoded._id;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  turnDocumentsToObjects(docs, returnFirst) {
    const objects = docs.map((doc) => {
      return doc.toObject();
    });
    return returnFirst ? objects[0] : objects;
  }
}
