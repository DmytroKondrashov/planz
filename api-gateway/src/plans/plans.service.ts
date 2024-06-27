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
    return this.planModel.find({ listId: id }).exec();
  }

  async createPlan(body: CreatePlanDto): Promise<Plan> {
    const { name, text, due, listId } = body;
    const res = await this.planModel.create({
      name,
      text,
      due,
      listId,
    });
    return res;
  }

  async deletePlan(id: string) {
    try {
      await this.planModel.deleteOne({ _id: id });
      return 'Plan deleted';
    } catch (error) {
      return 'Failed to delete Plan';
    }
  }
}
