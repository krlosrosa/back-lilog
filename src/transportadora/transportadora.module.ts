import { Module } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import { TransportadoraController } from './transportadora.controller';
import { AddNovaTransportadora } from './application/addNovaTransportadora';
import { BuscarTransportadorasPorCentro } from './application/buscarTransportadorasPorCentro';
import { EditarTransportadora } from './application/editarTransportadora';
import { DeletarTransportadora } from './application/deletarTransportadora';
import { TransportadoraPrismaRepository } from './infra/transporte-prisma.repository';
@Module({
  controllers: [TransportadoraController],
  providers: [
    TransportadoraService,
    AddNovaTransportadora,
    BuscarTransportadorasPorCentro,
    EditarTransportadora,
    DeletarTransportadora,
    {
      provide: 'IDevolucaoTransportadorasRepository',
      useClass: TransportadoraPrismaRepository,
    },
  ],
})
export class TransportadoraModule {}
