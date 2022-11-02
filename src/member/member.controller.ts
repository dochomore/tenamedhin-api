import { subject } from '@casl/ability';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guard/access-token/access-token.guard';
import { RequirePolicies } from 'src/authorization/decorators/check-policies.decorators';
import { Action } from 'src/authorization/enums/action';
import { AbilityFactory } from 'src/authorization/factories/ability.factory';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';
import { CreateMemberPolicyHandler } from 'src/authorization/policy-handlers/member/create/create-member-policy.handler';
import { DeleteMemberPolicyHandler } from 'src/authorization/policy-handlers/member/delete/delete-member-policy.handler';
import { ReadMemberPolicyHandler } from 'src/authorization/policy-handlers/member/read/read-member-policy.handler';
import { UpdateMemberPolicyHandler } from 'src/authorization/policy-handlers/member/update/update-member-policy.handler';
import { MemberSubject } from 'src/constants';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

@Controller('members')
@UseGuards(PoliciesGuard)
@UseGuards(AccessTokenGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async getAbility(req) {
    return await this.abilityFactory.create(req.user);
  }

  @Post()
  @RequirePolicies(new CreateMemberPolicyHandler())
  async create(@Req() req, @Body() createMemberDto: CreateMemberDto) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(
        Action.CREATE,
        subject(MemberSubject, createMemberDto),
      );
      if (isAllowed) {
        return this.memberService.create(createMemberDto);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Get()
  @RequirePolicies(new ReadMemberPolicyHandler())
  async findAll(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit = 25,
  ) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = await ability.can(Action.READ, MemberSubject);
      if (isAllowed) {
        limit = limit > 100 ? 100 : limit; // reset to 100 if the upper bound is exceeded
        return this.memberService.findAll({ limit: limit, page: page });
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Get(':id')
  @RequirePolicies(new ReadMemberPolicyHandler())
  async findOne(@Req() req, @Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.READ, MemberSubject);
      if (isAllowed) {
        return this.memberService.findOne(id);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Patch(':id')
  @RequirePolicies(new UpdateMemberPolicyHandler())
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @Req() req,
  ) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(
        Action.UPDATE,
        subject(MemberSubject, updateMemberDto),
      );

      if (isAllowed) {
        return this.memberService.update(id, updateMemberDto);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Delete(':id')
  @RequirePolicies(new DeleteMemberPolicyHandler())
  async remove(@Req() req, @Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.DELETE, MemberSubject);
      if (isAllowed) {
        return this.memberService.remove(id);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
}
