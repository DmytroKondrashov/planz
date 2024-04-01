import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateListDto } from './dto/create.list.dto';
import { EditListDto } from './dto/edit.list.dto';
import { ListOwnershipGuard } from './guards/list.ownership.guard';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsersLists(@Token() token: string) {
    return this.listsService.getUsersLists(token);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getList(@Token() token: string, @Param('id') id: string) {
    return this.listsService.getList(token, id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createList(@Token() token: string, @Body() body: CreateListDto) {
    return this.listsService.createList(token, body);
  }

  @Post(':id')
  @UseGuards(AuthGuard, ListOwnershipGuard)
  editList(@Body() body: EditListDto, @Param('id') id: string) {
    return this.listsService.editList(body, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, ListOwnershipGuard)
  deleteList(@Param('id') id: string) {
    return this.listsService.deleteList(id);
  }
}
