import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/plan.schema';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
    private readonly commonService: CommonService,
  ) {}

  async getUsersLists(token: string) {
    return this.listModel
      .find({ _id: this.commonService.getIdFromToken(token) })
      .exec();
  }
}
