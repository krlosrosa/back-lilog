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
    // Definindo o tempo em minutos
    const tempoMaximoVisitas = 4 * 60 * 1000; // 240 * 1000 = 240000 milissegundos
    const tempoMaximoDePausa = 70 * 60 * 1000; // 240 * 1000 = 240000 milissegundos
    const tempoMaximoDePausaTermica = 30 * 60 * 1000; // 240 * 1000 = 240000 milissegundos

    demanda.pausas?.map((item) => {
      if (item.motivo === 'PAUSA_TERMICA') {
        if (item.intervaloDePausa() > tempoMaximoDePausaTermica) {
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
            motivoAnomalia: 'PAUSA_TERMICA_EXCESSIVA',
          });
        }
      }
      if (item.motivo !== 'PAUSA_TERMICA') {
        if (item.intervaloDePausa() > tempoMaximoDePausa) {
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
            motivoAnomalia: 'PAUSA_EXCESSIVA',
          });
        }
      }
    });

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

    if (tempoDemanda > tempoMaximoVisitas) {
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
        motivoAnomalia: 'TERMINO_MUITO_LONGO',
      });
    }

    await this.anomaliaProdutividade.adicionarAnomalia(listaAnomalias);
  }
}
