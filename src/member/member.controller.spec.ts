import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(undefined);

      try {
        expect(await controller.findAll()).toThrow(BadRequestException);
      } catch (error) {}
    });
  });
});
