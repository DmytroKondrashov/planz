import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/list.schema';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { CreateListDto } from './dto/create.list.dto';
import { EditListDto } from './dto/edit.list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
    private readonly commonService: CommonService,
  ) {}

  async getUsersLists(token: string): Promise<List[]> {
    return this.listModel
      .find({ userId: this.commonService.getIdFromToken(token) })
      .exec();
  }

  async getList(token: string, id: string): Promise<List> {
    const res = await this.listModel.find({ _id: id }).exec();
    return this.commonService.turnDocumentsToObjects(res, true);
  }

  async createList(token: string, body: CreateListDto): Promise<List> {
    const userId = this.commonService.getIdFromToken(token);
    return this.listModel.create({
      name: body.name,
      userId,
      plans: [],
    });
  }

  async editList(body: EditListDto, id: string): Promise<List> {
    try {
      await this.listModel.updateOne({ _id: id }, body);
      return this.listModel.findById({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during the update',
      );
    }
  }

  async deleteList(id: string): Promise<string> {
    try {
      await this.listModel.deleteOne({ _id: id });
      // TODO: delete all the plans that belong to this list
      return 'List successfully deleted!';
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during list deletion!',
      );
    }
  }

  async deleteAllLists(ids: string[]): Promise<string> {
    try {
      await this.listModel.deleteMany({ _id: { $in: ids } });
      return 'All Lists successfully deleted!';
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during all Lists deletion!',
      );
    }
  }
}
