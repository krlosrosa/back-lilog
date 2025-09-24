import { Processo, Turno } from 'src/produtividade/enums/produtividade.enums';

export interface AddPausaGeralInfraDto {
  cadastradoPorId: string;
  centerId: string;
  turno: Turno;
  processo: Processo;
  segmento: string;
  motivo: string;
}
