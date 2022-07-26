import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationService]), UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
