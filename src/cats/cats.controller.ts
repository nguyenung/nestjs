import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FilterCatDto, CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  async listAll(@Query() query: FilterCatDto): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Post()
  async createCat(@Body() data: CreateCatDto) {
    this.catService.create(data);
  }

  @Get(':id')
  detailCat(@Param() params: any) {
    return `Detail cat with id #${params.id}`;
  }

  @Put(':id')
  updateCat(@Param() params: any, @Body() data: UpdateCatDto) {
    return `Updated cat with id #${params.id}`;
  }

  @Delete(':id')
  deleteCat(@Param() params: any) {
    return `Deleted cat with id #${params.id}`;
  }
}
