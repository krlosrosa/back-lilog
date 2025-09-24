import { PartialType } from '@nestjs/swagger';
import { CreateProdutividadeDto } from './create-produtividade.dto';

export class UpdateProdutividadeDto extends PartialType(
  CreateProdutividadeDto,
) {}
