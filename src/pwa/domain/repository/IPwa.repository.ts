import { ListaDemandasZodDto } from 'src/pwa/dtos/listaDemandas.dto';
import { PwaNotasEntity } from '../entities/pwaNotas.entity';

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
}
