import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoZodDto } from './dto/create-produto.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('api/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @ApiOperation({
    summary: 'Cria um novo produto',
    operationId: 'criarNovoProduto',
  })
  @ApiResponse({ status: 200, description: 'Produto criado com sucesso' })
  @ApiCommonErrors()
  @Post()
  create(@Body() createProdutoDto: CreateProdutoZodDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @ApiOperation({
    summary: 'Busca todos os produtos',
    operationId: 'buscarTodosProdutos',
  })
  @ApiResponse({ status: 200, description: 'Produtos buscados com sucesso' })
  @ApiCommonErrors()
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @ApiOperation({
    summary: 'Busca um produto',
    operationId: 'buscarProduto',
  })
  @ApiResponse({ status: 200, description: 'Produto buscado com sucesso' })
  @ApiCommonErrors()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualiza um produto',
    operationId: 'atualizarProduto',
  })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiCommonErrors()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: CreateProdutoZodDto,
  ) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @ApiOperation({
    summary: 'Deleta um produto',
    operationId: 'deletarProduto',
  })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso' })
  @ApiCommonErrors()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
