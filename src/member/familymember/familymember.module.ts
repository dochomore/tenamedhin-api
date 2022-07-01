import { Module } from '@nestjs/common';
import { FamilymemberService } from './familymember.service';
import { FamilymemberController } from './familymember.controller';

@Module({
  controllers: [FamilymemberController],
  providers: [FamilymemberService]
})
export class FamilymemberModule {}
