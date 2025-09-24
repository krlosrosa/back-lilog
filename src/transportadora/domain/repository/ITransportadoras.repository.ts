import { ResponseTransportadoraDto } from 'src/transportadora/dto/responseTransportadora.dto';

export interface IDevolucaoTransportadorasRepository {
  create(nome: string, centerId: string): Promise<string>;
  findAllByCenter(centerId: string): Promise<ResponseTransportadoraDto>;
  edit(id: number, nome: string): Promise<void>;
  delete(id: number): Promise<void>;
}
