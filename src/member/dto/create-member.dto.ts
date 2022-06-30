import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  dateOfRegistration: string;

  memberId?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  gfName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @Min(0)
  age: number;

  willPay: boolean;

  idCardIssued?: boolean;
}
