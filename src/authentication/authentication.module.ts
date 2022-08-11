import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessTokenStrategy } from './strategies/access-token-strategy';
import { LocalStrategy } from './strategies/local/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationService]),
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
