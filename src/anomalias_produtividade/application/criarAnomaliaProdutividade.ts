import { Inject, Injectable } from '@nestjs/common';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { type IAnomaliaProdutividadeRepositoryCenter } from '../domain/repositories/IAnomaliaProdutividadeRepositoryCenter.repository';
import { CriarAnomaliaZodDto } from '../dtos/criarAnomalia';
import { type IRulesRepository } from 'src/rules/domain/repositories/IRules.reposity';
import { Engine } from 'json-rules-engine';

@Injectable()
export class CriarAnomaliaProdutividadeUsecase {
  constructor(
    @Inject('IAnomaliaProdutividade')
    private readonly anomaliaProdutividade: IAnomaliaProdutividadeRepositoryCenter,
    @Inject('IRulesRepository')
    private readonly rulesRepository: IRulesRepository,
  ) {}

  async execute(demanda: DemandaEntity): Promise<void> {
    const listaAnomalias: CriarAnomaliaZodDto[] = [];
    const tempoMinimoPorVisitaEmMilisegundos = 5 * 1000;
    // Definindo o tempo em minutos
    const tempoMaximoVisitas = 4 * 60 * 1000; // 240 * 1000 = 240000 milissegundos
    const tempoMaximoDePausa = 90 * 60 * 1000; // 240 * 1000 = 240000 milissegundos
    const tempoMaximoDePausaTermica = 30 * 60 * 1000; // 240 * 1000 = 240000 milissegundos

    const rules = await this.rulesRepository.findRulesByCenterId(
      demanda.centerId,
    );

    const engine = new Engine();
    const facts = {
      caixas: demanda.quantidadeCaixas(),
      visitas: demanda.quantidadeVisitas(),
      tempoPorVisita:
        demanda.calcularTempoTrabalhado() / demanda.quantidadeVisitas(),
      unidades: demanda.quantidadeUnidades(),
      palete: demanda.quantidadePaletes(),
      statusDemanda: demanda.status,
      produtividade: demanda.calcularProdutividade(),
      inicio: demanda.inicio,
      fim: demanda.fim ?? new Date(),
    };

    engine.addRule({
      conditions: rules[0].conditions,
      event: {
        type: 'teste',
        params: facts,
      },
    });

    console.log(facts);

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
