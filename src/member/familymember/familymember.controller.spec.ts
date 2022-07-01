import { Test, TestingModule } from '@nestjs/testing';
import { FamilymemberController } from './familymember.controller';
import { FamilymemberService } from './familymember.service';

describe('FamilymemberController', () => {
  let controller: FamilymemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilymemberController],
      providers: [FamilymemberService],
    }).compile();

    controller = module.get<FamilymemberController>(FamilymemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
