import { IsNotEmpty, IsUUID } from 'class-validator';
import { Action } from 'src/authorization/enums/action';

export class CreatePermissionDto {
  @IsNotEmpty()
  action: Action;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
