import { IsDefined } from 'class-validator';

export class CreatePermissionDto {
  @IsDefined()
  action: string;

  @IsDefined()
  subject: string;

  @IsDefined()
  userId: string;
}
