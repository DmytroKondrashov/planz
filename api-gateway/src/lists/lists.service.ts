import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/plan.schema';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { CreateListDto } from './dto/create.list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
    private readonly commonService: CommonService,
  ) {}

  async getUsersLists(token: string) {
    return this.listModel
      .find({ userId: this.commonService.getIdFromToken(token) })
      .exec();
  }

  async getList(token: string, id: string) {
    return this.listModel.find({ _id: id }).exec();
  }

  async createList(token: string, body: CreateListDto) {
    const userId = this.commonService.getIdFromToken(token);
    return this.listModel.create({
      name: body.name,
      userId,
    });
  }
}
