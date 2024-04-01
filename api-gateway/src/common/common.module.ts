import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET,
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CommonService, JwtService],
})
export class CommonModule {}
