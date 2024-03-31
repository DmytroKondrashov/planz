import { Controller, Get } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Token } from 'src/common/decorators/token.decorator';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  getUsersLists(@Token() token: string) {
    return this.listsService.getUsersLists(token);
  }
}
