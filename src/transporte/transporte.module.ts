import { Module } from '@nestjs/common';
import { TransporteService } from './transporte.service';
import { TransporteController } from './transporte.controller';
import { AdicionarTransporteUsecase } from './application/adicionarTransporte.usecase';
import { TransportePrismaRepository } from './infra/prisma/transporte-prisma.repository';
import { GetTransportesByIdsUsecase } from './application/getTransportesByIds.usecase';
import { AdicionarPaletesSeparacaoUsecase } from './application/adicionarPaletes.usecase';
import { ListarNaoCadastadosUsecase } from './application/listarNaoCadastados';
import { GuardarIntesSeparacaoUsecase } from './application/guardarIntesSeparacao.usecase';
import { TransporteRedisRepository } from './infra/redis/transporte-redis.repository';
import { BuscarItensPorTransporteUsecase } from './application/buscarItensPorTransporte.usecase';
import { BuscarTransportePorDataUsecase } from './application/buscarTransportePorData';
import { TransporteResolver } from './transporte.resolver';
import { ListarTransportesComDemandaIniciada } from './application/listarTransportesComDemandaIniciada';

@Module({
  providers: [
    TransporteService,
    AdicionarTransporteUsecase,
    GetTransportesByIdsUsecase,
    AdicionarPaletesSeparacaoUsecase,
    ListarNaoCadastadosUsecase,
    GuardarIntesSeparacaoUsecase,
    BuscarItensPorTransporteUsecase,
    BuscarTransportePorDataUsecase,
    ListarTransportesComDemandaIniciada,
    {
      provide: 'ITransporteRepository',
      useClass: TransportePrismaRepository,
    },
    {
      provide: 'ITransporteCacheRepository',
      useClass: TransporteRedisRepository,
    },
    TransporteResolver,
  ],
  controllers: [TransporteController],
})
export class TransporteModule {}
