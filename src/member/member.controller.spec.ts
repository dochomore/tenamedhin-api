import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Member } from './entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        MemberService,
        { provide: getRepositoryToken(Member), useValue: {} },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of members', async () => {
      const result: Member[] = [];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      const expectedResult = await controller.findAll();

      expect(expectedResult).toBe(result);
    });

    it("should throw 'BadRequestException' if no valid valiue is returned", async () => {
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(undefined);

      try {
        expect(await controller.findAll()).toThrow(BadRequestException);
      } catch (error) {
        expect(findAllSpy).toBeCalledTimes(1);
      }
    });
  });

  describe('findOne', () => {
    it('should return a member with valid id', async () => {
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

      const spy = jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);

      const expectedResult = await controller.findOne(
        'ec713036-d067-406a-8b20-8e246fd8cd9c',
      );

      expect(expectedResult).toEqual(result);
      expect(spy).toHaveBeenCalledWith('ec713036-d067-406a-8b20-8e246fd8cd9c');
    });

    it("should throw 'NotFoundException' if not valid id is provided", async () => {
      const spy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException());

      try {
        expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      } catch (error) {
        expect(spy).toHaveBeenCalledWith('1');
      }
    });

    it("should throw 'NotFoundException' if undefined value is provided", async () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new BadRequestException());

      try {
        expect(controller.findOne(undefined)).rejects.toThrow(
          BadRequestException,
        );
      } catch (error) {
        expect(findOneSpy).toHaveBeenCalledWith(undefined);
        expect(findOneSpy).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('create', () => {
    let member;

    beforeEach(() => {
      member = {
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
    });

    it('should create new member', async () => {
      const dto: any = {};

      const spy = jest.spyOn(service, 'create').mockResolvedValue(member);
      expect(controller.create(dto)).resolves.toBe(member);
      expect(spy).toHaveBeenCalledWith(dto);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should throw [BadRequestException] if first name were not provided', async () => {
      const dto: any = {};

      const spy = jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto) => {
          const { firstName } = dto;
          if (!firstName) {
            return new BadRequestException();
          }
        });

      expect(controller.create(dto)).resolves.toThrow(BadRequestException);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update member', async () => {
      const id = 'id';
      const dto: any = {};

      const spy = jest.spyOn(service, 'update').mockImplementation(() => dto);

      expect(controller.update(id, dto)).toEqual(dto);
      expect(spy).toHaveBeenCalledWith(id, dto);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should throw [NotFoundException] if invalid id is provided', async () => {
      const id = 'id';
      const dto: any = {};

      const spy = jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException());

      expect(controller.update(id, dto)).rejects.toThrow(NotFoundException);
      expect(spy).toHaveBeenCalledWith(id, dto);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
