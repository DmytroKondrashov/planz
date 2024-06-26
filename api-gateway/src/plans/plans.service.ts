import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './schemas/plan.schema';
import { Model } from 'mongoose';
import { CreatePlanDto } from './dto/create.plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plan.name) private readonly planModel: Model<Plan>,
  ) {}

  async getPlansByLists(id: string) {
    console.log(await this.planModel.find().exec())
    return this.planModel.find({ listId: id }).exec();
  }

  createPlan(body: CreatePlanDto): Promise<Plan> {
    const { name, text, due, listId } = body;
    return this.planModel.create({
      name,
      text,
      due,
      listId,
    });
  }
}
