import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;
}
