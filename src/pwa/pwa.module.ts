import { Module } from '@nestjs/common';
import { PwaController } from './pwa.controller';
import { PwaPrismaRepository } from './infra/prisma/pwa.prisma';
import { PwaService } from './pwa.service';
import { IniciarConferenciaDemandaUsecase } from './application/iniciarConferenciaDemanda';
import { BuscarTodasDemandasPorCentroEStatusUsecase } from './application/buscarTodasDemandasPorCentroEStatus';
import { ProdutoModule } from 'src/produto/produto.module';
import { BuscarTodosProdutosUsecase } from './application/buscarTodosProdutos';

@Module({
  controllers: [PwaController],
  providers: [
    IniciarConferenciaDemandaUsecase,
    BuscarTodasDemandasPorCentroEStatusUsecase,
    BuscarTodosProdutosUsecase,
    {
      provide: 'IPwaRepository',
      useClass: PwaPrismaRepository,
    },
    PwaService,
  ],
  imports: [ProdutoModule],
})
export class PwaModule {}
