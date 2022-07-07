import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Familymember } from './entities/familymember.entity';
import { FamilymemberController } from './familymember.controller';
import { FamilymemberService } from './familymember.service';

describe('FamilymemberController', () => {
  let controller: FamilymemberController;
  let service: FamilymemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilymemberController],
      providers: [
        FamilymemberService,
        { provide: getRepositoryToken(Familymember), useValue: {} },
      ],
    }).compile();

    service = module.get<FamilymemberService>(FamilymemberService);
    controller = module.get<FamilymemberController>(FamilymemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
