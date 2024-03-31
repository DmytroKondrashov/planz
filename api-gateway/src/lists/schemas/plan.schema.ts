import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class List {
  @Prop()
  name: string;

  @Prop()
  userId: ObjectId;
}

export const ListSchema = SchemaFactory.createForClass(List);
