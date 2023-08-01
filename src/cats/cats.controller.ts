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

@Controller('cats')
export class CatsController {
  @Get()
  listAll(@Query() query: FilterCatDto) {
    return `List all cats with name like "${query.name}", limit ${query.limit} items.`;
  }

  @Post()
  createCat(@Body() data: CreateCatDto): string {
    return `Created a new cat with name "${data.name}", age "${data.age}"`;
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
