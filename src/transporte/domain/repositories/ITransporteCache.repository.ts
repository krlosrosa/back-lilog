export interface ITransporteCacheRepository {
  adicionarIntesSeparacao(
    inte: {
      key: string;
      value: string;
    }[],
  ): Promise<void>;
  buscarItensPorTransporte(transporteId: string): Promise<string>;
}
