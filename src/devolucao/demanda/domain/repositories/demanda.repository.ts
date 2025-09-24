import { DemandaDevolucaoDtoResponse } from '../../dtos/demandaDevoluca.dto';
import { AddItensEmDemandaDto } from '../../dtos/ravex/addItensEmDemanda.dto';
import { ReturnInfoGeralRavex } from '../../dtos/ravex/returnInfoGeralRavex';
import { DevolucaoDemandaEntity } from '../entities/demandaDevolucao.entity';

export interface IDemandaRepository {
  liberarDemandaArmazem(
    demandaId: number,
    responsavelId: string,
  ): Promise<void>;
  listarDemandasPorData(
    data: string,
    centroId: string,
  ): Promise<DemandaDevolucaoDtoResponse>;
  addDemandaViaRavex(
    demanda: ReturnInfoGeralRavex,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<number>;
  adicionarItensEmDemandaViaRavex(
    demandaId: number,
    centerId: string,
    adicionadoPorId: string,
    itens: AddItensEmDemandaDto,
  ): Promise<void>;

  reabrirDemanda(demandaId: number, responsavelId: string): Promise<void>;
  deletarDemanda(demandaId: number): Promise<void>;
  finalizarDemanda(demandaId: number, responsavelId: string): Promise<void>;
  getDemandaById(demandaId: number): Promise<DevolucaoDemandaEntity | null>;
}
