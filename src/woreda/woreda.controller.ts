import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WoredaService } from './woreda.service';
import { CreateWoredaDto } from './dto/create-woreda.dto';
import { UpdateWoredaDto } from './dto/update-woreda.dto';

@Controller('woreda')
export class WoredaController {
  constructor(private readonly woredaService: WoredaService) {}

  @Post()
  create(@Body() createWoredaDto: CreateWoredaDto) {
    return this.woredaService.create(createWoredaDto);
  }

  @Get()
  findAll() {
    return this.woredaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.woredaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWoredaDto: UpdateWoredaDto,
  ) {
    return this.woredaService.update(id, updateWoredaDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.woredaService.remove(id);
  }
}
