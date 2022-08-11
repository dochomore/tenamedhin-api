import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthenticationDto } from './dto/create-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(authDto: AuthenticationDto) {
    const { username, password } = authDto;
    const user = await this.userService.findOneByUsername(username);
    if (user instanceof User) {
      if (await bcrypt.compare(password, user.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...others } = user;
        return others;
      }
    }
    return null;
  }

  async login(user: User) {
    // const payload = { username: user.username, sub: user.userId };
    // return { access_token: this.jwtService.sign(payload) };
    try {
      const tokens = await this.getTokens(user.userId, user.username);
      await this.updateRefreshToken(user.userId, tokens.refreshToken);
      return tokens;
    } catch (err) {
      return new UnauthorizedException();
    }
  }

  async logout(userId: string) {
    return await this.userService.updateRefreshToken(userId, null);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await this.userService.encrypt(refreshToken);
    return await this.userService.updateRefreshToken(userId, hashedToken);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
