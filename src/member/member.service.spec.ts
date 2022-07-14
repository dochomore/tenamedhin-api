import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

const mockRepository = () => ({
  create: jest.fn(),
});

describe('MemberService', () => {
  let service: MemberService;
  let repository: Repository<Member>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        { provide: getRepositoryToken(Member), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repository = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
