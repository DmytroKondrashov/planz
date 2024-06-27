import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create.plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getPlansByLists(@Param('id') id: string) {
    return this.plansService.getPlansByLists(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPlan(@Body() body: CreatePlanDto) {
    return this.plansService.createPlan(body);
  }

  @Delete()
  @UseGuards(AuthGuard)
  deletePlan(@Param('id') id: string) {
    return this.plansService.deletePlan(id);
  }
}
