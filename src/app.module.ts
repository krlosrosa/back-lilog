import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './_shared/infra/prisma/prisma.module';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProdutividadeModule } from './produtividade/produtividade.module';
import { UserModule } from './user/user.module';
import { CentroModule } from './centro/centro.module';
import { TransporteModule } from './transporte/transporte.module';
import { RedisModule } from './_shared/infra/redis/redis.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TesteModule } from './teste/teste.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { DemandaModule } from './devolucao/demanda/demanda.module';
import { AxiosModule } from './_shared/infra/axios/axios.module';
import { ProdutoModule } from './produto/produto.module';
import { TransportadoraModule } from './transportadora/transportadora.module';
import { PwaModule } from './pwa/pwa.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    JwtModule.register({
      global: true,
      publicKey: `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`, //join(process.cwd(), 'src/auth/keys/public.pem'),
    }),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    PrometheusModule.register({
      path: '/metrics',
    }),
    FastifyMulterModule,
    PrismaModule,
    AxiosModule,
    ProdutividadeModule,
    UserModule,
    CentroModule,
    TransporteModule,
    RedisModule,
    TesteModule,
    DashboardModule,
    DemandaModule,
    ProdutoModule,
    TransportadoraModule,
    PwaModule,
    RulesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total de requisições HTTP',
      labelNames: ['method', 'route', 'status'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duração das requisições HTTP em segundos',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
    }),
  ],
})
export class AppModule {}
