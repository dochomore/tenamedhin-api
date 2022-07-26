import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class JwtStrategy {
  constructor(private readonly authService: AuthenticationService) {
    // super({ secreteOrKey: 'somerandomkey' });
  }

  async validate(username: string, password: string) {
    // TODO
  }
}
