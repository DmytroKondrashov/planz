import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Plan {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop()
  due: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
