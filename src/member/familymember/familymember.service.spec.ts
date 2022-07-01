import { Test, TestingModule } from '@nestjs/testing';
import { FamilymemberService } from './familymember.service';

describe('FamilymemberService', () => {
  let service: FamilymemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilymemberService],
    }).compile();

    service = module.get<FamilymemberService>(FamilymemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
