import { PartialType } from '@nestjs/mapped-types';
import { CreateWoredaDto } from './create-woreda.dto';

export class UpdateWoredaDto extends PartialType(CreateWoredaDto) {}
