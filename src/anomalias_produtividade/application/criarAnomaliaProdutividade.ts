import { Inject, Injectable } from '@nestjs/common';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { type IAnomaliaProdutividadeRepositoryCenter } from '../domain/repositories/IAnomaliaProdutividadeRepositoryCenter.repository';
import { CriarAnomaliaZodDto } from '../dtos/criarAnomalia';

@Injectable()
export class CriarAnomaliaProdutividadeUsecase {
  constructor(
    @Inject('IAnomaliaProdutividade')
    private readonly anomaliaProdutividade: IAnomaliaProdutividadeRepositoryCenter,
  ) {}

  async execute(demanda: DemandaEntity): Promise<void> {
    const listaAnomalias: CriarAnomaliaZodDto[] = [];
    const tempoMinimoPorVisitaEmMilisegundos = 5 * 1000;
    const tempoDemanda: any =
      demanda.calcularTempoTrabalhado() / demanda.quantidadeVisitas();
    if (tempoDemanda <= tempoMinimoPorVisitaEmMilisegundos) {
      listaAnomalias.push({
        centerId: demanda.centerId,
        cadastroPorId: demanda.cadastradoPorId,
        caixas: demanda.quantidadeCaixas(),
        demandaId: demanda.id,
        enderecosVisitado: demanda.quantidadeVisitas(),
        funcionarioId: demanda.funcionarioId,
        inicio: demanda.inicio,
        fim: demanda.fim ?? new Date(),
        nomeCadastradoPor: '',
        nomeFuncionario: demanda.funcionario,
        paletes: demanda.quantidadePaletes(),
        unidades: demanda.quantidadeUnidades(),
        produtividade: demanda.calcularProdutividade(),
        motivoAnomalia: 'TERMINO_RAPIDO',
      });
    }

    await this.anomaliaProdutividade.adicionarAnomalia(listaAnomalias);
  }
}
