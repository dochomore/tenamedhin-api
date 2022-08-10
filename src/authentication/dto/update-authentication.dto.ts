import { PartialType } from '@nestjs/mapped-types';
import { AuthenticationDto } from './create-authentication.dto';

export class UpdateAuthenticationDto extends PartialType(AuthenticationDto) {}
