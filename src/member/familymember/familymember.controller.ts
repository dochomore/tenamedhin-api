import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FamilymemberService } from './familymember.service';
import { CreateFamilymemberDto } from './dto/create-familymember.dto';
import { UpdateFamilymemberDto } from './dto/update-familymember.dto';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';
import { AccessTokenGuard } from 'src/authentication/guard/access-token/access-token.guard';
import { RequirePolicies } from 'src/authorization/decorators/check-policies.decorators';
import { CreateFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/create/create-family-member-policy.handler';
import { ReadFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/read/read-family-member-policy.handler';
import { UpdateFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/update/update-family-member-policy.handler';
import { DeleteFamilyMemberPolicyHandler } from 'src/authorization/policy-handlers/family-member/delete/delete-family-member-policy.handler';

@Controller('familymembers')
@UseGuards(PoliciesGuard)
@UseGuards(AccessTokenGuard)
export class FamilymemberController {
  constructor(private readonly familymemberService: FamilymemberService) {}

  @Post()
  @RequirePolicies(new CreateFamilyMemberPolicyHandler())
  create(@Body() createFamilymemberDto: CreateFamilymemberDto) {
    return this.familymemberService.create(createFamilymemberDto);
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
