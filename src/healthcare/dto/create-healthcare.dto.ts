import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthcareDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
