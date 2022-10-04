import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @IsNotEmpty()
  @IsUUID()
  memberId: string;
}
