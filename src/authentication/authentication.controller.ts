import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AccessTokenGuard } from './guard/access-token/access-token.guard';
import { LocalAuthGuard } from './guard/local/local-auth.guard';
import { RefreshTokenGuard } from './guard/refresh-token/refresh-token.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@Request() req) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const username = req.user['username'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(username, refreshToken);
  }
}
