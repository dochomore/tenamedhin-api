import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilymemberDto } from './create-familymember.dto';

export class UpdateFamilymemberDto extends PartialType(CreateFamilymemberDto) {}
