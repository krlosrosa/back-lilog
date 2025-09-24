import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/_shared/infra/redis/redis.service';
import { ITransporteCacheRepository } from 'src/transporte/domain/repositories/ITransporteCache.repository';

@Injectable()
export class TransporteRedisRepository implements ITransporteCacheRepository {
  constructor(private readonly redisService: RedisService) {}

  async adicionarIntesSeparacao(
    inte: {
      [key: string]: string;
    }[],
  ): Promise<void> {
    const pipeline = this.redisService.pipeline();
    inte.forEach((item) => {
      pipeline.set(`transporte:${item.key}`, item.value);
    });
    await pipeline.exec();
  }

  async buscarItensPorTransporte(transporteId: string): Promise<any> {
    const itens = await this.redisService.get(`transporte:${transporteId}`);
    return itens;
  }
}
