import { Controller, Inject, Post, Body, Param, Get } from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dtos/createRule.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';

@ApiTags('Rules')
@Controller('rules')
export class RulesController {
  constructor(
    @Inject(RulesService)
    private readonly rulesService: RulesService,
  ) {}

  @ApiOperation({
    summary: 'Cria uma nova regra',
    operationId: 'createRule',
  })
  @ApiBody({ type: CreateRuleDto })
  @ApiCommonErrors()
  @Post('create')
  createRule(@Body() command: CreateRuleDto) {
    return this.rulesService.createRule(command);
  }

  @ApiOperation({
    summary: 'Valida uma regra',
    operationId: 'validateRule',
  })
  @ApiResponse({
    status: 200,
    description: 'Regra validada',
    type: String,
  })
  @ApiCommonErrors()
  @Get('validate/:centerId')
  validateRule(@Param('centerId') centerId: string) {
    return this.rulesService.validarRule(centerId);
  }
}
