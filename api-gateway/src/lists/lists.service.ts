import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/plan.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  async getUsersLists(token: string) {}
}
