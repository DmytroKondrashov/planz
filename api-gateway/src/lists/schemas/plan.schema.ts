import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class List {
  @Prop()
  name: string;

  @Prop()
  userId: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
