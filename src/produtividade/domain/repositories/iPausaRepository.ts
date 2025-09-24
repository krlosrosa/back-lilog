import { PausaEntity } from '../entities/pausa.entity';
import { PausaGeralEntity } from '../entities/pausaGeral.entity';
import { AddPauseGeralDto } from 'src/produtividade/dto/addPauseGeral.dto';
import { Processo, Turno } from 'src/produtividade/enums/produtividade.enums';

export interface IPausaRepository {
  adicionarPausa(pausa: PausaEntity, demandaId: number): Promise<void>;
  finalizarPausa(
    pausa: PausaEntity,
    demandaId: number,
    observacao?: string,
  ): Promise<void>;
  buscarPausaGeralAtiva(params: {
    centerId: string;
    turno: Turno;
    processo: Processo;
    segmento: string;
  }): Promise<PausaGeralEntity | null>;
  adicionarPausaGeral(params: AddPauseGeralDto): Promise<void>;
  finalizarPausaGeral(pausaGeralId: number): Promise<void>;
}
