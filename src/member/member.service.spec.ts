import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
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

  describe('create', () => {
    it('should create member', async () => {
      const dto: any = {
        dateOfRegistration: '',
        firstName: 'Yimesgen',
        fatherName: '',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
      };

      const member = {
        memberUid: '',
        dateOfRegistration: '',
        memberId: '',
        firstName: 'Yimesgen',
        fatherName: '',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
        idCardIssued: false,
      };
      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(member);

      expect(service.create(dto)).resolves.toEqual(member);
      expect(saveSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw [BadRequestException] if first name were not provided', async () => {
      const dto = {
        dateOfRegistration: '',
        firstName: '',
        fatherName: '',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
      };

      expect(service.create(dto)).resolves.toThrow(BadRequestException);
    });
  });
});
