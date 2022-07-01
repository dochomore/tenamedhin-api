import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFamilymemberDto {
  dateOfRegistration?: Date;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsNotEmpty()
  @IsString()
  gfName: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  dateOfBirth: Date;
}
