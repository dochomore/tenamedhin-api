import { Test, TestingModule } from '@nestjs/testing';
import { KebeleController } from './kebele.controller';
import { KebeleService } from './kebele.service';

describe('KebeleController', () => {
  let controller: KebeleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KebeleController],
      providers: [KebeleService],
    }).compile();

    controller = module.get<KebeleController>(KebeleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
