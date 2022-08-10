import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guard/local/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  logout(@Req() req) {
    //TODO
  }

  @Post('refresh')
  refresh(@Req() req) {
    //TODO
  }
}
