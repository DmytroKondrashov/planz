import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { ListsService } from '../lists.service';

@Injectable()
export class ListOwnershipGuard implements CanActivate {
  constructor(
    private readonly commonService: CommonService,
    private readonly listsService: ListsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.commonService.extractTokenFromHeader(request);
    const listId = request.params.id;
    if (!token) {
      throw new UnauthorizedException('You need to be logged in!');
    }
    const userId = await this.commonService.getIdFromToken(token);
    if (!listId) {
      throw new InternalServerErrorException('No list id provided');
    }
    // TODO: fix this "as any"
    const list = (await this.listsService.getList(token, listId)) as any;
    return list.userId === userId;
  }
}
