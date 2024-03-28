import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import userSchema from './schemas/user.schema';

@Injectable()
export class AuthService {
  User = mongoose.model('User', userSchema);

  async createUser(body) {}
}
