import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { FamilymemberModule } from './familymember/familymember.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), FamilymemberModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
