import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  action: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
