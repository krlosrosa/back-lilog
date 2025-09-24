import { Inject, Injectable } from '@nestjs/common';
import { ResponseStartDemandaZodDto } from './dtos/responseStartDemanda.dto';
import { IniciarConferenciaDemandaUsecase } from './application/iniciarConferenciaDemanda';
import { BuscarTodasDemandasPorCentroEStatusUsecase } from './application/buscarTodasDemandasPorCentroEStatus';
import { ListaDemandasZodDto } from './dtos/listaDemandas.dto';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';
import { BuscarTodosProdutosUsecase } from './application/buscarTodosProdutos';

@Injectable()
export class PwaService {
  constructor(
    @Inject(IniciarConferenciaDemandaUsecase)
    private readonly iniciarConferenciaDemandaUsecase: IniciarConferenciaDemandaUsecase,
    @Inject(BuscarTodasDemandasPorCentroEStatusUsecase)
    private readonly buscarTodasDemandasPorCentroEStatusUsecase: BuscarTodasDemandasPorCentroEStatusUsecase,
    @Inject(BuscarTodosProdutosUsecase)
    private readonly buscarTodosProdutosUsecase: BuscarTodosProdutosUsecase,
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
}
