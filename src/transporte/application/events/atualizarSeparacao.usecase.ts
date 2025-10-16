import { Inject, Injectable } from '@nestjs/common';
import {
  PaleteComInfoTransporte,
  type ITransporteRepository,
} from 'src/transporte/domain/repositories/ITransporte.repository';
import { UpdateTransporteDto } from 'src/transporte/dto/updateTransporte.dto';

@Injectable()
export class AtualizarSeparacaoUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(info: UpdateTransporteDto): Promise<void> {
    const tipoProcessoBanco =
      await this.transporteRepository.buscarTipoPorDemandaId(info.demanda);
    const demandas =
      await this.transporteRepository.listarTransportesDeUmaDemanda(
        info.demanda,
        tipoProcessoBanco,
      );

    const paletes = await this.transporteRepository.buscarPaletesPorTransportes(
      demandas,
      tipoProcessoBanco,
    );

    const paletesAgrupados = agruparPorTransporte(paletes);

    for (const [transporteId, paletesDoTransporte] of Object.entries(
      paletesAgrupados,
    )) {
      const transporteFinalizado = paletesDoTransporte.every((palete) => {
        return palete.paleteStatus === 'CONCLUIDO';
      });
      if (transporteFinalizado) {
        console.log({ eventoDemanda: transporteFinalizado });
        if (tipoProcessoBanco === 'SEPARACAO') {
          if (paletesDoTransporte[0].separacaoStatus === 'CONCLUIDO') return;
          return this.transporteRepository.atualizarTransporteSeparacao(
            transporteId,
            'CONCLUIDO',
          );
        }
        if (tipoProcessoBanco === 'CONFERENCIA') {
          if (paletesDoTransporte[0].conferenciaStatus === 'CONCLUIDO') return;
          return this.transporteRepository.atualizarTransporteConferencia(
            transporteId,
            'CONCLUIDO',
          );
        }
        if (tipoProcessoBanco === 'CARREGAMENTO') {
          if (paletesDoTransporte[0].carregamentoStatus === 'CONCLUIDO') return;
          return this.transporteRepository.atualizarTransporteCarregamento(
            transporteId,
            'CONCLUIDO',
          );
        }
      } else {
        console.log(paletesDoTransporte);
        if (tipoProcessoBanco === 'SEPARACAO') {
          return this.transporteRepository.atualizarTransporteSeparacao(
            transporteId,
            'EM_PROGRESSO',
          );
        }
        if (tipoProcessoBanco === 'CONFERENCIA') {
          return this.transporteRepository.atualizarTransporteConferencia(
            transporteId,
            'EM_PROGRESSO',
          );
        }
        if (tipoProcessoBanco === 'CARREGAMENTO') {
          return this.transporteRepository.atualizarTransporteCarregamento(
            transporteId,
            'EM_PROGRESSO',
          );
        }
      }
    }
  }
}

function agruparPorTransporte(
  array: PaleteComInfoTransporte[],
): Record<string, PaleteComInfoTransporte[]> {
  return array.reduce((acc, obj) => {
    const valor = obj['transporteId'];
    if (!acc[valor]) {
      acc[valor] = [];
    }
    acc[valor].push(obj);
    return acc;
  }, {});
}
