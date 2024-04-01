import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class List {
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Prop()
  plans: [];
}

export const ListSchema = SchemaFactory.createForClass(List);
