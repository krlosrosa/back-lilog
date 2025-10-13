import { Module } from '@nestjs/common';
import { PwaController } from './pwa.controller';
import { PwaPrismaRepository } from './infra/prisma/pwa.prisma';
import { PwaService } from './pwa.service';
import { IniciarConferenciaDemandaUsecase } from './application/iniciarConferenciaDemanda';
import { BuscarTodasDemandasPorCentroEStatusUsecase } from './application/buscarTodasDemandasPorCentroEStatus';
import { ProdutoModule } from 'src/produto/produto.module';
import { BuscarTodosProdutosUsecase } from './application/buscarTodosProdutos';
import { GetContabilByIdUsecase } from './application/getContabilById.usecase';
import { FinalizarDemandaUsecase } from './application/finalizarDemanda';
import { ProcessarImagensDevolucaoUsecase } from './application/processarImagensDevoluca';
import { SalvarImagensBancoUsecase } from './application/salvarImagensBanco';

@Module({
  controllers: [PwaController],
  providers: [
    IniciarConferenciaDemandaUsecase,
    BuscarTodasDemandasPorCentroEStatusUsecase,
    BuscarTodosProdutosUsecase,
    GetContabilByIdUsecase,
    FinalizarDemandaUsecase,
    ProcessarImagensDevolucaoUsecase,
    SalvarImagensBancoUsecase,
    {
      provide: 'IPwaRepository',
      useClass: PwaPrismaRepository,
    },
    PwaService,
  ],
  imports: [ProdutoModule],
})
export class PwaModule {}
