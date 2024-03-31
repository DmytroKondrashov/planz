import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class List {
  @Prop()
  name: string;

  @Prop()
  userId: ObjectId;
}
