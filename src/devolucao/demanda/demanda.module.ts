import { Module } from '@nestjs/common';
import { DemandaController } from './demanda.controller';
import { DemandaService } from './demanda.service';
import { DemandaPrismaRepository } from './infra/demanda-prisma.repository';
import { RavexPrismaRepository } from './ravex/ravex-prisma.repository';
import { ProdutoModule } from 'src/produto/produto.module';
import { LiberarDemandaArmazem } from './application/liberarDemandaArmazem';
import { ListarDemandasPorData } from './application/listarDemandasPorDataCentro';
import { GetInfoByViagemIdRavex } from './application/getInfoByViagemIdRavex';
import { AdicionarNovaDemandaViaRavex } from './application/adicionarNovaDemandaViaRavex';
import { AdicionarItensEmDemandaViaRavex } from './application/adicionarItensEmDemandaViaRavex';
import { ReabrirDemandaUseCase } from './application/reabrirDemanda';
import { DeletarDemandaUseCase } from './application/deletarDemanda';
import { FinalizarDemandaUseCase } from './application/finalizarDemanda';
import { ResultadoDemandaUseCase } from './application/resultadoDemanda';
import { ListarNotasDemandaUsecase } from './application/listarNotasDemanda.usecase';
import { GetInfoDemandaUsecase } from './application/getInfoDemanda';

@Module({
  controllers: [DemandaController],
  imports: [ProdutoModule],
  providers: [
    DemandaService,
    LiberarDemandaArmazem,
    ListarDemandasPorData,
    GetInfoByViagemIdRavex,
    AdicionarNovaDemandaViaRavex,
    AdicionarItensEmDemandaViaRavex,
    ReabrirDemandaUseCase,
    DeletarDemandaUseCase,
    FinalizarDemandaUseCase,
    ResultadoDemandaUseCase,
    ListarNotasDemandaUsecase,
    GetInfoDemandaUsecase,
    {
      provide: 'IDemandaRepository',
      useClass: DemandaPrismaRepository,
    },
    {
      provide: 'IRavexRepository',
      useClass: RavexPrismaRepository,
    },
  ],
})
export class DemandaModule {}
