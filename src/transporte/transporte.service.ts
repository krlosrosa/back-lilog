import { Inject, Injectable } from '@nestjs/common';
import { AdicionarTransporteUsecase } from './application/adicionarTransporte.usecase';
import { GetTransportesByIdsUsecase } from './application/getTransportesByIds.usecase';
import { AdicionarPaletesSeparacaoUsecase } from './application/adicionarPaletes.usecase';
import { ListarNaoCadastadosUsecase } from './application/listarNaoCadastados';
import { type TransportInfo } from './application/adicionarTransporte.usecase';
import { GuardarIntesSeparacaoUsecase } from './application/guardarIntesSeparacao.usecase';
import { BuscarItensPorTransporteUsecase } from './application/buscarItensPorTransporte.usecase';
import { BuscarTransportePorDataUsecase } from './application/buscarTransportePorData';
import { ItensDoTransporteZodDto } from './dto/itensDoTransporte.dtos';
import { PaleteInputZodDto } from './dto/adicionarPalete';
import { ListarTransportesComDemandaIniciada } from './application/listarTransportesComDemandaIniciada';

@Injectable()
export class TransporteService {
  @Inject(AdicionarTransporteUsecase)
  private readonly adicionarTransporteUsecase: AdicionarTransporteUsecase;

  adicionarTransporte(
    command: TransportInfo[],
    centerId: string,
    dataExpedicao: Date,
    accountId: string,
  ) {
    return this.adicionarTransporteUsecase.execute(
      command,
      centerId,
      dataExpedicao,
      accountId,
    );
  }

  @Inject(GetTransportesByIdsUsecase)
  private readonly getTransportesByIdsUsecase: GetTransportesByIdsUsecase;

  getTransportesByIds(ids: string[]) {
    return this.getTransportesByIdsUsecase.execute(ids);
  }

  @Inject(AdicionarPaletesSeparacaoUsecase)
  private readonly adicionarPaletesSeparacaoUsecase: AdicionarPaletesSeparacaoUsecase;

  adicionarPaletesSeparacao(command: PaleteInputZodDto, accountId: string) {
    return this.adicionarPaletesSeparacaoUsecase.execute(command, accountId);
  }

  @Inject(ListarNaoCadastadosUsecase)
  private readonly listarNaoCadastadosUsecase: ListarNaoCadastadosUsecase;
  listarNaoCadastados(ids: string[]) {
    return this.listarNaoCadastadosUsecase.execute(ids);
  }

  @Inject(GuardarIntesSeparacaoUsecase)
  private readonly guardarIntesSeparacaoUsecase: GuardarIntesSeparacaoUsecase;

  guardarIntesSeparacao(inte: { key: string; value: string }[]) {
    return this.guardarIntesSeparacaoUsecase.execute(inte);
  }

  @Inject(BuscarItensPorTransporteUsecase)
  private readonly buscarItensPorTransporteUsecase: BuscarItensPorTransporteUsecase;

  buscarItensPorTransporte(
    transporteId: string,
  ): Promise<ItensDoTransporteZodDto> {
    return this.buscarItensPorTransporteUsecase.execute(transporteId);
  }

  @Inject(BuscarTransportePorDataUsecase)
  private readonly buscarTransportePorDataUsecase: BuscarTransportePorDataUsecase;

  buscarTransportePorData(data: string, centerId: string) {
    return this.buscarTransportePorDataUsecase.execute(data, centerId);
  }

  @Inject(ListarTransportesComDemandaIniciada)
  private readonly listarTransportesComDemandaIniciadaUsecase: ListarTransportesComDemandaIniciada;

  listarTransportesComDemandaIniciada(ids: string[]) {
    return this.listarTransportesComDemandaIniciadaUsecase.execute(ids);
  }
}
