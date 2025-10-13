import { CriarAnomaliaZodDto } from 'src/anomalias_produtividade/dtos/criarAnomalia';

export interface IAnomaliaProdutividadeRepositoryCenter {
  adicionarAnomalia(anomalia: CriarAnomaliaZodDto[]): Promise<void>;
}
