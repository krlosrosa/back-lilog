import { ListaDemandasZodDto } from 'src/pwa/dtos/listaDemandas.dto';
import { PwaNotasEntity } from '../entities/pwaNotas.entity';
import { ContabilByIdResponseZodDto } from 'src/devolucao/demanda/dtos/contabilByIdResponseZod.dto';
import { SalvarImagensBancoZodDto } from 'src/pwa/dtos/salvarImagensBanco.dto';
import { FinalizarDemandaDevolucaoZodDto } from 'src/pwa/dtos/finalizarDemandaDevolucao.dto';

export interface IPwaRepository {
  iniciarConferenciaDemanda(
    demandaId: number,
    horaInicio: string,
    doca: string,
    conferenteId: string,
  ): Promise<PwaNotasEntity[]>;
  buscarTodasDemandasPorCentroEStatus(
    centerId: string,
    conferenteId: string,
  ): Promise<ListaDemandasZodDto>;
  getContabilById(
    demandaId: number,
  ): Promise<ContabilByIdResponseZodDto | null>;
  salvarImagensBanco(command: SalvarImagensBancoZodDto[]): Promise<void>;
  finalizarDemanda(
    demandaId: string,
    request: FinalizarDemandaDevolucaoZodDto,
  ): Promise<void>;
}
