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
import { FamilymemberService } from './familymember.service';
import { CreateFamilymemberDto } from './dto/create-familymember.dto';
import { UpdateFamilymemberDto } from './dto/update-familymember.dto';

@Controller('familymember')
export class FamilymemberController {
  constructor(private readonly familymemberService: FamilymemberService) {}

  @Post()
  create(@Body() createFamilymemberDto: CreateFamilymemberDto) {
    return this.familymemberService.create(createFamilymemberDto);
  }

  @Get()
  findAll() {
    return this.familymemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.familymemberService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateFamilymemberDto: UpdateFamilymemberDto,
  ) {
    return this.familymemberService.update(id, updateFamilymemberDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.familymemberService.remove(id);
  }
}
