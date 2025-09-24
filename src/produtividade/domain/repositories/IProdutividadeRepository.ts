import { CreateProdutividadeDto } from 'src/produtividade/dto/create-produtividade.dto';
import { DemandaEntity } from '../entities/demanda.entity';
import { BuscarProdutividadeZodDto } from 'src/produtividade/dto/buscarProdutividade.dto';
import {
  OverViewProdutividadeResponseZodDto,
  OverViewProdutividadeZodDto,
} from 'src/produtividade/dto/overViewProdutividade.dto';

export interface IProdutividadeRepository {
  create(
    produtividade: CreateProdutividadeDto,
    cadastradoPorId: string,
  ): Promise<boolean>;
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
}
