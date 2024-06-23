import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './schemas/plan.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plan.name) private readonly planModel: Model<Plan>,
  ) {}

  getPlansByLists(id: string) {
    return this.planModel.find({ listId: id }).exec();
  }
}
