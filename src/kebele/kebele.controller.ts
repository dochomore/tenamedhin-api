import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KebeleService } from './kebele.service';
import { CreateKebeleDto } from './dto/create-kebele.dto';
import { UpdateKebeleDto } from './dto/update-kebele.dto';

@Controller('kebeles')
export class KebeleController {
  constructor(private readonly kebeleService: KebeleService) {}

  @Post()
  create(@Body() createKebeleDto: CreateKebeleDto) {
    return this.kebeleService.create(createKebeleDto);
  }

  @Get()
  findAll() {
    return this.kebeleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kebeleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKebeleDto: UpdateKebeleDto) {
    return this.kebeleService.update(+id, updateKebeleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kebeleService.remove(id);
  }
}
