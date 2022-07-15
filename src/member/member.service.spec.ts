import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
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
        fatherName: 'Morka',
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
        fatherName: 'Morka',
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

    it('should throw [BadRequestException] something bad happens', async () => {
      const dto: any = {
        dateOfRegistration: '',
        firstName: 'Yimesgen',
        fatherName: 'Morka',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
      };

      const member: any = {
        memberUid: '',
        dateOfRegistration: '',
        memberId: '',
        firstName: 'Yimesgen',
        fatherName: 'Morka',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
        idCardIssued: false,
      };

      const createSpy = jest
        .spyOn(repository, 'create')
        .mockImplementation(() => {
          return member;
        });

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new BadRequestException());

      expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(createSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a member', async () => {
      const id = 'id';
      const result: Member = {
        memberUid: '',
        dateOfRegistration: '',
        memberId: '',
        firstName: '',
        fatherName: '',
        gfName: '',
        gender: '',
        age: 0,
        willPay: false,
        idCardIssued: false,
      };
      const findOneSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(result);

      expect(service.findOne(id)).resolves.toEqual(result);
      expect(findOneSpy).toHaveBeenCalledWith({ memberUid: id });
    });
    it('should throw NotFoundException for invalid id', async () => {
      const id = 'id';
      const spy = jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => null);

      expect(service.findOne(id)).resolves.toThrow(NotFoundException);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return list of members', async () => {
      const spy = jest.spyOn(repository, 'find').mockResolvedValue([]);
      expect(service.findAll()).resolves.toEqual([]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException', async () => {
      const spy = jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new BadRequestException());

      expect(service.findAll()).rejects.toThrow(BadRequestException);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete member', async () => {
      const id = 'id';
      const deleteResult = { affected: 1 } as DeleteResult;
      const spy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(deleteResult);

      expect(service.remove(id)).resolves.toEqual(deleteResult);
      expect(spy).toHaveBeenCalledWith(id);
    });
  });
});
