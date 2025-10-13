import { Inject, Injectable } from '@nestjs/common';
import { ResponseStartDemandaZodDto } from './dtos/responseStartDemanda.dto';
import { IniciarConferenciaDemandaUsecase } from './application/iniciarConferenciaDemanda';
import { BuscarTodasDemandasPorCentroEStatusUsecase } from './application/buscarTodasDemandasPorCentroEStatus';
import { ListaDemandasZodDto } from './dtos/listaDemandas.dto';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';
import { BuscarTodosProdutosUsecase } from './application/buscarTodosProdutos';
import { GetContabilByIdUsecase } from './application/getContabilById.usecase';
import { ContabilByIdResponseZodDto } from '../devolucao/demanda/dtos/contabilByIdResponseZod.dto';
import { FinalizarDemandaDevolucaoZodDto } from './dtos/finalizarDemandaDevolucao.dto';
import { FinalizarDemandaUsecase } from './application/finalizarDemanda';
import { ProcessarImagensDevolucaoUsecase } from './application/processarImagensDevoluca';
import { File } from '@nest-lab/fastify-multer';

@Injectable()
export class PwaService {
  constructor(
    @Inject(IniciarConferenciaDemandaUsecase)
    private readonly iniciarConferenciaDemandaUsecase: IniciarConferenciaDemandaUsecase,
    @Inject(BuscarTodasDemandasPorCentroEStatusUsecase)
    private readonly buscarTodasDemandasPorCentroEStatusUsecase: BuscarTodasDemandasPorCentroEStatusUsecase,
    @Inject(BuscarTodosProdutosUsecase)
    private readonly buscarTodosProdutosUsecase: BuscarTodosProdutosUsecase,
    @Inject(GetContabilByIdUsecase)
    private readonly getContabilByIdUsecase: GetContabilByIdUsecase,
    @Inject(FinalizarDemandaUsecase)
    private readonly finalizarDemandaUsecase: FinalizarDemandaUsecase,
    @Inject(ProcessarImagensDevolucaoUsecase)
    private readonly processarImagensDemandaUsecase: ProcessarImagensDevolucaoUsecase,
  ) {}

  async startDemanda(
    demandaId: number,
    horaInicio: string,
    doca: string,
    conferenteId: string,
  ): Promise<ResponseStartDemandaZodDto> {
    return this.iniciarConferenciaDemandaUsecase.execute(
      demandaId,
      horaInicio,
      doca,
      conferenteId,
    );
  }

  async buscarTodasDemandasPorCentroEStatus(
    centerId: string,
    conferenteId: string,
  ): Promise<ListaDemandasZodDto> {
    return this.buscarTodasDemandasPorCentroEStatusUsecase.execute(
      centerId,
      conferenteId,
    );
  }

  async buscarTodosProdutos(): Promise<ResponseProdutoDto[]> {
    return this.buscarTodosProdutosUsecase.execute();
  }

  async getContabilById(
    demandaId: number,
  ): Promise<ContabilByIdResponseZodDto | null> {
    return this.getContabilByIdUsecase.execute(demandaId);
  }

  async finalizarDemanda(
    demandaId: string,
    request: FinalizarDemandaDevolucaoZodDto,
  ): Promise<void> {
    return this.finalizarDemandaUsecase.execute(request, demandaId);
  }

  async processarImagensDemanda(
    demandaId: string,
    files: any[],
  ): Promise<void> {
    return this.processarImagensDemandaUsecase.execute(demandaId, files);
  }
}
