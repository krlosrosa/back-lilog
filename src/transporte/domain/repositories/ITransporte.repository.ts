import { InputPaleteInfraDto } from 'src/transporte/domain/dtos/inputPalete.dto';
import { InputTransportDto } from '../dtos/inputTransport.dto';
import { TransporteResponseDto } from 'src/transporte/dto/transporte.dto';

export type PaleteComInfoTransporte = {
  paleteStatus: string;
  transporteId: string;
  separacaoStatus: string;
  conferenciaStatus: string;
  carregamentoStatus: string;
};

export interface ITransporteRepository {
  adicionarTransporte(transporte: InputTransportDto[]): Promise<void>;
  adicionarPaletesSeparacao(paletes: InputPaleteInfraDto[]): Promise<void>;
  getTransportesByIds(ids: string[]): Promise<TransporteResponseDto[]>;
  listarTransportes(ids: string[]): Promise<string[]>;
  buscarTransportePorData(
    data: string,
    centerId: string,
  ): Promise<TransporteResponseDto[]>;
  listarTransportesComDemandaIniciada(ids: string[]): Promise<string[]>;
  listarTransportesDeUmaDemanda(
    demandaId: number,
    tipo: string,
  ): Promise<string[]>;
  buscarPaletesPorTransportes(
    transportesIds: string[],
  ): Promise<PaleteComInfoTransporte[]>;
  atualizarTransporteSeparacao(
    transporteId: string,
    status: string,
  ): Promise<void>;
}
