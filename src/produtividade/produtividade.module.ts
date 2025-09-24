import { Module } from '@nestjs/common';
import { ProdutividadeController } from './produtividade.controller';
import { IniciarProdutividadeUsecase } from './application/usecases/iniciarProdutividade.usecase';
import { ProdutividadeService } from './produtividade.service';
import { FinalizarProdutividadeUsecase } from './application/usecases/finalizarProdutividade.usecase';
import { AddPausaIndividualUsecase } from './application/usecases/addPausaIndividual.usecase';
import { FinalizarPausaIndividualUsecase } from './application/usecases/finalizarPausaIndividual';
import { DeletarDemandaUsecase } from './application/usecases/deletarDemanda.usecase';
import { AddPausaGeralUsecase } from './application/usecases/addPausaGeral.usecase';
import { FinalizarPausaGeralUsecase } from './application/usecases/finalizarPausaGeral.usecase';
import { ProdutividadePrismaRepository } from './infra/prisma/produtividade-prisma.repository';
import { PaletePrismaRepository } from './infra/prisma/palete-prisma.repository';
import { UserPrismaRepository } from 'src/user/infra/prisma/user-prisma.repository';
import { PausaPrismaRepository } from './infra/prisma/pausa-prisma.repository';
import { BuscarProdutividadeUsecase } from './application/usecases/buscarProdutividade.usecase';
import { ProdutividadeResolver } from './produtividade.resolver';
import { OverViewUsecase } from './application/usecases/overView.usecase';
import { BuscarInfoDemandaUsecase } from './application/usecases/buscarInfoDemanda.usecase';
import { RulesPrismaRepository } from 'src/rules/infra/rules.prisma';

@Module({
  controllers: [ProdutividadeController],
  providers: [
    IniciarProdutividadeUsecase,
    FinalizarProdutividadeUsecase,
    AddPausaIndividualUsecase,
    FinalizarPausaIndividualUsecase,
    DeletarDemandaUsecase,
    ProdutividadeService,
    AddPausaGeralUsecase,
    FinalizarPausaGeralUsecase,
    BuscarProdutividadeUsecase,
    OverViewUsecase,
    BuscarInfoDemandaUsecase,
    {
      provide: 'IProdutividadeRepository',
      useClass: ProdutividadePrismaRepository,
    },
    {
      provide: 'IPaleteRepository',
      useClass: PaletePrismaRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'IPausaRepository',
      useClass: PausaPrismaRepository,
    },
    {
      provide: 'IRulesRepository',
      useClass: RulesPrismaRepository,
    },
    ProdutividadeResolver,
  ],
})
export class ProdutividadeModule {}
