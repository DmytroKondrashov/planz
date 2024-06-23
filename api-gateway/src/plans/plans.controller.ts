import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getPlansByLists(@Param('id') id: string) {
    return this.plansService.getPlansByLists(id);
  }
}
