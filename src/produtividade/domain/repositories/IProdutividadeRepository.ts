import { CreateProdutividadeDto } from 'src/produtividade/dto/create-produtividade.dto';
import { DemandaEntity } from '../entities/demanda.entity';
import { BuscarProdutividadeZodDto } from 'src/produtividade/dto/buscarProdutividade.dto';
import {
  OverViewProdutividadeResponseZodDto,
  OverViewProdutividadeZodDto,
} from 'src/produtividade/dto/overViewProdutividade.dto';
import { DemandasNaoIniciadasZodDto } from 'src/produtividade/dto/demandasNaoFinalizadas.dto';

export interface IProdutividadeRepository {
  create(
    produtividade: CreateProdutividadeDto,
    cadastradoPorId: string,
  ): Promise<number>;
  findByPalletId(palletId: string): Promise<DemandaEntity | null>;
  deletarDemanda(demandaId: number): Promise<void>;
  finalizarDemanda(demanda: DemandaEntity): Promise<void>;
  buscarProdutividade(
    command: BuscarProdutividadeZodDto,
  ): Promise<DemandaEntity[]>;
  overViewProdutividade(
    command: OverViewProdutividadeZodDto,
  ): Promise<OverViewProdutividadeResponseZodDto>;
  buscarInfoDemanda(demandaId: number): Promise<DemandaEntity | null>;
  infoDemandaByUser(userId, centerId): Promise<DemandaEntity[]>;
  demandasNaoFinalizadas(
    centerId: string,
    data: string,
    processo: string,
  ): Promise<DemandasNaoIniciadasZodDto>;
  findDemandasByCenter(
    centerId: string,
    date: string,
    processo: string,
  ): Promise<DemandaEntity[]>;
}
