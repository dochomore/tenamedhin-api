import { subject } from '@casl/ability';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { RequirePolicies } from 'src/authorization/decorators/check-policies.decorators';
import { Action } from 'src/authorization/enums/action';
import { AbilityFactory } from 'src/authorization/factories/ability.factory';
import { CreateCreditPolicyHandler } from 'src/authorization/policy-handlers/credit/create/create-credit-policy.handler';
import { ReadCreditPolicyHandler } from 'src/authorization/policy-handlers/credit/read/read-credit-policy.handler';
import { CreditSubject } from 'src/constants';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('credits')
export class CreditController {
  constructor(
    private readonly creditService: CreditService,
    private readonly abilityFactory: AbilityFactory,
  ) { }

  async getAbility(req) {
    return await this.abilityFactory.create(req.user);
  }

  @Post()
  @RequirePolicies(new CreateCreditPolicyHandler())
  async create(@Req() req, @Body() createCreditDto: CreateCreditDto) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.CREATE, CreditSubject);
      if (isAllowed) {
        return this.creditService.create(createCreditDto);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Get()
  @RequirePolicies(new ReadCreditPolicyHandler())
  async findAll(@Req() req) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.READ, CreditSubject);
      if (isAllowed) {
        return this.creditService.findAll();
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Get(':id')
  @RequirePolicies(new ReadCreditPolicyHandler())
  async findOne(@Req() req, @Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.READ, CreditSubject);
      if (isAllowed) {
        return this.creditService.findOne(id);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCreditDto: UpdateCreditDto,
  ) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(
        Action.UPDATE,
        subject(CreditSubject, updateCreditDto),
      );
      if (isAllowed) {
        return this.creditService.update(id, updateCreditDto);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    try {
      const ability = await this.getAbility(req);
      const isAllowed = ability.can(Action.DELETE, CreditSubject);
      if (isAllowed) {
        return this.creditService.remove(id);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
}
