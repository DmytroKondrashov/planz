import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsersLists(@Token() token: string) {
    return this.listsService.getUsersLists(token);
  }
}
