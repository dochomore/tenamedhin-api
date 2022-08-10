import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtAuthGuard } from './authentication/guard/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/guard/local/local-auth.guard';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
