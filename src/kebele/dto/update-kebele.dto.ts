import { PartialType } from '@nestjs/mapped-types';
import { CreateKebeleDto } from './create-kebele.dto';

export class UpdateKebeleDto extends PartialType(CreateKebeleDto) {}
