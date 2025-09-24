import { Inject, Injectable } from '@nestjs/common';
import { LiberarDemandaArmazem } from './application/liberarDemandaArmazem';
import { ListarDemandasPorData } from './application/listarDemandasPorDataCentro';
import { DemandaDevolucaoDtoResponse } from './dtos/demandaDevoluca.dto';
import { GetInfoByViagemIdRavex } from './application/getInfoByViagemIdRavex';
import { ReturnInfoGeralRavex } from './dtos/ravex/returnInfoGeralRavex';
import { AdicionarNovaDemandaViaRavex } from './application/adicionarNovaDemandaViaRavex';
import { AddItensEmDemandaDto } from './dtos/ravex/addItensEmDemanda.dto';
import { AdicionarItensEmDemandaViaRavex } from './application/adicionarItensEmDemandaViaRavex';
import { ReabrirDemandaUseCase } from './application/reabrirDemanda';
import { DeletarDemandaUseCase } from './application/deletarDemanda';
import { FinalizarDemandaUseCase } from './application/finalizarDemanda';
import { ResumoDevolucaoDto } from './dtos/resumoItemRetorno';
import { ResultadoDemandaUseCase } from './application/resultadoDemanda';
import { ListarNotasDemandaResponseZodDto } from './dtos/ListarNotasDemandaResponseZod.dto';
import { ListarNotasDemandaUsecase } from './application/listarNotasDemanda.usecase';
import { GetInfoDemandaResponseZodDto } from './dtos/getInfoDemandaResponseZod.dto';
import { GetInfoDemandaUsecase } from './application/getInfoDemanda';

@Injectable()
export class DemandaService {
  constructor(
    @Inject(LiberarDemandaArmazem)
    private readonly liberarDemandaArmazemUsecase: LiberarDemandaArmazem,
    @Inject(ListarDemandasPorData)
    private readonly listarDemandasPorDataUsecase: ListarDemandasPorData,
    @Inject(GetInfoByViagemIdRavex)
    private readonly getInfoByViagemIdRavexUsecase: GetInfoByViagemIdRavex,
    @Inject(AdicionarNovaDemandaViaRavex)
    private readonly adicionarNovaDemandaViaRavexUsecase: AdicionarNovaDemandaViaRavex,
    @Inject(AdicionarItensEmDemandaViaRavex)
    private readonly adicionarItensEmDemandaViaRavexUsecase: AdicionarItensEmDemandaViaRavex,
    @Inject(ReabrirDemandaUseCase)
    private readonly reabrirDemandaUsecase: ReabrirDemandaUseCase,
    @Inject(DeletarDemandaUseCase)
    private readonly deletarDemandaUsecase: DeletarDemandaUseCase,
    @Inject(FinalizarDemandaUseCase)
    private readonly finalizarDemandaUsecase: FinalizarDemandaUseCase,
    @Inject(ResultadoDemandaUseCase)
    private readonly resultadoDemandaUsecase: ResultadoDemandaUseCase,
    @Inject(ListarNotasDemandaUsecase)
    private readonly listarNotasDemandaUsecase: ListarNotasDemandaUsecase,
    @Inject(GetInfoDemandaUsecase)
    private readonly getInfoDemandaUsecase: GetInfoDemandaUsecase,
  ) {}

  async liberarDemandaArmazem(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    return this.liberarDemandaArmazemUsecase.execute(demandaId, responsavelId);
  }

  async listarDemandasPorData(
    data: string,
    centroId: string,
  ): Promise<DemandaDevolucaoDtoResponse> {
    return this.listarDemandasPorDataUsecase.execute(data, centroId);
  }

  async getInfoByViagemIdRavex(
    viagemId: string,
  ): Promise<ReturnInfoGeralRavex> {
    return this.getInfoByViagemIdRavexUsecase.execute(viagemId);
  }

  async adicionarNovaDemandaViaRavex(
    demandaRavex: ReturnInfoGeralRavex,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<number> {
    return this.adicionarNovaDemandaViaRavexUsecase.execute(
      demandaRavex,
      centerId,
      adicionadoPorId,
    );
  }

  async adicionarItensEmDemandaViaRavex(
    demandaId: number,
    centerId: string,
    itens: AddItensEmDemandaDto,
    adicionadoPorId: string,
  ): Promise<void> {
    return this.adicionarItensEmDemandaViaRavexUsecase.execute(
      demandaId,
      centerId,
      itens,
      adicionadoPorId,
    );
  }

  async reabrirDemanda(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    return this.reabrirDemandaUsecase.execute(demandaId, responsavelId);
  }

  async deletarDemanda(demandaId: number): Promise<void> {
    return this.deletarDemandaUsecase.execute(demandaId);
  }

  async finalizarDemanda(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    return this.finalizarDemandaUsecase.execute(demandaId, responsavelId);
  }

  async resultadoDemanda(demandaId: number): Promise<ResumoDevolucaoDto> {
    return this.resultadoDemandaUsecase.execute(demandaId);
  }

  async listarNotasDemanda(
    demandaId: number,
  ): Promise<ListarNotasDemandaResponseZodDto> {
    return this.listarNotasDemandaUsecase.execute(demandaId);
  }

  async getInfoDemanda(
    demandaId: number,
  ): Promise<GetInfoDemandaResponseZodDto> {
    return await this.getInfoDemandaUsecase.execute(demandaId);
  }
}
