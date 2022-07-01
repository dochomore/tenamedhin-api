import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familymember } from './entities/familymember.entity';
import { FamilymemberController } from './familymember.controller';
import { FamilymemberService } from './familymember.service';

@Module({
  imports: [TypeOrmModule.forFeature([Familymember])],
  controllers: [FamilymemberController],
  providers: [FamilymemberService],
})
export class FamilymemberModule {}
