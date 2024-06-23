import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Plan {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop()
  due: Date;

  @Prop()
  listId: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
