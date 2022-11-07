import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guard/access-token/access-token.guard';
import { RequirePolicies } from 'src/authorization/decorators/check-policies.decorators';
import { Action } from 'src/authorization/enums/action';
import { AbilityFactory } from 'src/authorization/factories/ability.factory';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';
import { CreateFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/create/create-family-member-policy.handler';
import { DeleteFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/delete/delete-family-member-policy.handler';
import { ReadFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/read/read-family-member-policy.handler';
import { UpdateFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/update/update-family-member-policy.handler';
import { FamilyMemberSubject } from 'src/constants';
import { CreateFamilymemberDto } from './dto/create-familymember.dto';
import { UpdateFamilymemberDto } from './dto/update-familymember.dto';
import { FamilymemberService } from './familymember.service';

@Controller('familymembers')
@UseGuards(PoliciesGuard)
@UseGuards(AccessTokenGuard)
export class FamilymemberController {
  constructor(
    private readonly familymemberService: FamilymemberService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async getAbility(req) {
    return await this.abilityFactory.create(req.user);
  }

  @Post()
  @RequirePolicies(new CreateFamilyMemberPolicyHandler())
  async create(
    @Req() req,
    @Body() createFamilymemberDto: CreateFamilymemberDto,
  ) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.CREATE, FamilyMemberSubject);
      if (isAllowed) {
        return this.familymemberService.create(createFamilymemberDto);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Get()
  @RequirePolicies(new ReadFamilyMemberPolicyHandler())
  findAll() {
    return this.familymemberService.findAll();
  }

  @Get(':id')
  @RequirePolicies(new ReadFamilyMemberPolicyHandler())
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.familymemberService.findOne(id);
  }

  @Patch(':id')
  @RequirePolicies(new UpdateFamilyMemberPolicyHandler())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateFamilymemberDto: UpdateFamilymemberDto,
  ) {
    return this.familymemberService.update(id, updateFamilymemberDto);
  }

  @RequirePolicies(new DeleteFamilyMemberPolicyHandler())
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.familymemberService.remove(id);
  }
}
