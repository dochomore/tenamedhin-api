import { Test, TestingModule } from '@nestjs/testing';
import { KebeleService } from './kebele.service';

describe('KebeleService', () => {
  let service: KebeleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KebeleService],
    }).compile();

    service = module.get<KebeleService>(KebeleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
