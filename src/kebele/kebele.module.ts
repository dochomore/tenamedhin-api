import { Module } from '@nestjs/common';
import { KebeleService } from './kebele.service';
import { KebeleController } from './kebele.controller';

@Module({
  controllers: [KebeleController],
  providers: [KebeleService]
})
export class KebeleModule {}
