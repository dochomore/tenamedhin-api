import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsDate()
  dateOfCreation?: Date;

  @IsString()
  @IsNotEmpty()
  organizationName: string;
}
