import { Inject, Injectable } from '@nestjs/common';
import { IniciarProdutividadeUsecase } from './application/usecases/iniciarProdutividade.usecase';
import { FinalizarProdutividadeUsecase } from './application/usecases/finalizarProdutividade.usecase';
import { CreateProdutividadeDto } from './dto/create-produtividade.dto';
import { AddPausaIndividualUsecase } from './application/usecases/addPausaIndividual.usecase';
import { AddPausaIndividualDto } from './dto/addPausaIndividual.dto';
import { FinalizarPausaIndividualUsecase } from './application/usecases/finalizarPausaIndividual';
import { DeletarDemandaUsecase } from './application/usecases/deletarDemanda.usecase';
import { AddPausaGeralUsecase } from './application/usecases/addPausaGeral.usecase';
import { AddPauseGeralDto } from './dto/addPauseGeral.dto';
import { FinalizarPausaGeralUsecase } from './application/usecases/finalizarPausaGeral.usecase';
import { FinalizarPauseGeralDto } from './dto/finalizarPauseGeral.dto';
import { BuscarProdutividadeZodDto } from './dto/buscarProdutividade.dto';
import { BuscarProdutividadeUsecase } from './application/usecases/buscarProdutividade.usecase';
import { OverViewProdutividadeZodDto } from './dto/overViewProdutividade.dto';
import { OverViewUsecase } from './application/usecases/overView.usecase';
import { BuscarInfoDemandaUsecase } from './application/usecases/buscarInfoDemanda.usecase';

@Injectable()
export class ProdutividadeService {
  constructor(
    @Inject(IniciarProdutividadeUsecase)
    private readonly iniciarProdutividadeUsecase: IniciarProdutividadeUsecase,
    @Inject(FinalizarProdutividadeUsecase)
    private readonly finalizarProdutividadeUsecase: FinalizarProdutividadeUsecase,
    @Inject(AddPausaIndividualUsecase)
    private readonly addPausaIndividualUsecase: AddPausaIndividualUsecase,
    @Inject(FinalizarPausaIndividualUsecase)
    private readonly finalizarPausaIndividualUsecase: FinalizarPausaIndividualUsecase,
    @Inject(DeletarDemandaUsecase)
    private readonly deletarDemandaUsecase: DeletarDemandaUsecase,
    @Inject(AddPausaGeralUsecase)
    private readonly addPausaGeralUsecase: AddPausaGeralUsecase,
    @Inject(FinalizarPausaGeralUsecase)
    private readonly finalizarPausaGeralUsecase: FinalizarPausaGeralUsecase,
    @Inject(BuscarProdutividadeUsecase)
    private readonly buscarProdutividadeUsecase: BuscarProdutividadeUsecase,
    @Inject(OverViewUsecase)
    private readonly overViewProdutividadeUsecase: OverViewUsecase,
    @Inject(BuscarInfoDemandaUsecase)
    private readonly buscarInfoDemandaUsecase: BuscarInfoDemandaUsecase,
  ) {}

  iniciarProdutividade(
    command: CreateProdutividadeDto,
    cadastradoPorId: string,
  ) {
    return this.iniciarProdutividadeUsecase.execute({
      ...command,
      cadastradoPorId,
    });
  }

  finalizarProdutividade(palletId: string, observacao?: string) {
    return this.finalizarProdutividadeUsecase.execute(palletId, observacao);
  }

  addPausaIndividual(command: AddPausaIndividualDto, adicionadoPorId: string) {
    return this.addPausaIndividualUsecase.execute({
      ...command,
      registradoPorId: adicionadoPorId,
    });
  }

  finalizarPausaIndividual(palletId: string, observacao?: string) {
    return this.finalizarPausaIndividualUsecase.execute(palletId, observacao);
  }

  deletarDemanda(palletId: string) {
    return this.deletarDemandaUsecase.execute(palletId);
  }

  addPausaGeral(command: AddPauseGeralDto, cadastradoPorId: string) {
    return this.addPausaGeralUsecase.execute({
      ...command,
      cadastradoPorId,
    });
  }

  finalizarPausaGeral(command: FinalizarPauseGeralDto) {
    return this.finalizarPausaGeralUsecase.execute(command);
  }

  buscarProdutividade(command: BuscarProdutividadeZodDto) {
    return this.buscarProdutividadeUsecase.execute(command);
  }

  overViewProdutividade(command: OverViewProdutividadeZodDto) {
    return this.overViewProdutividadeUsecase.execute(command);
  }

  buscarInfoDemanda(paleteId: string) {
    return this.buscarInfoDemandaUsecase.execute(paleteId);
  }
}
