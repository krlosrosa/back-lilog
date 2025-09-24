import { Processo } from 'src/produtividade/enums/produtividade.enums';

export type InputPaleteInfraDto = {
  criadoPorId: string;
  transporteId: string;
  id: string;
  empresa: string;
  quantidadeCaixas: number;
  quantidadeUnidades: number;
  quantidadePaletes: number;
  enderecoVisitado: number;
  segmento: string;
  tipoProcesso: Processo;
};
