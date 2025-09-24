import { PartialType } from '@nestjs/swagger';
import { CreateProdutoZodDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoZodDto) {}
