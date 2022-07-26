import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (user instanceof User) {
      if (user.password == password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...others } = user;
        return others;
      }
    }
    return null;
  }

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
