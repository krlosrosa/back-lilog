import { InputPaleteInfraDto } from 'src/transporte/domain/dtos/inputPalete.dto';
import { InputTransportDto } from '../dtos/inputTransport.dto';
import { TransporteResponseDto } from 'src/transporte/dto/transporte.dto';

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
}
