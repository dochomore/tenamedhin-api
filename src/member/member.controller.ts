import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guard/access-token/access-token.guard';
import { RequirePolicies } from 'src/authorization/decorators/check-policies.decorators';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';
import { CreateMemberPolicyHandler } from 'src/authorization/policy-handlers/member/create/create-member-policy.handler';
import { DeleteMemberPolicyHandler } from 'src/authorization/policy-handlers/member/delete/delete-member-policy.handler';
import { ReadMemberPolicyHandler } from 'src/authorization/policy-handlers/member/read/read-member-policy.handler';
import { UpdateMemberPolicyHandler } from 'src/authorization/policy-handlers/member/update/update-member-policy.handler';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

@Controller('members')
@UseGuards(PoliciesGuard)
@UseGuards(AccessTokenGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @RequirePolicies(new CreateMemberPolicyHandler())
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @RequirePolicies(new ReadMemberPolicyHandler())
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  @RequirePolicies(new ReadMemberPolicyHandler())
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  @RequirePolicies(new UpdateMemberPolicyHandler())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @RequirePolicies(new DeleteMemberPolicyHandler())
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.memberService.remove(id);
  }
}
