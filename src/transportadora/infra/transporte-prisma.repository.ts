import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { IDevolucaoTransportadorasRepository } from '../domain/repository/ITransportadoras.repository';
import { ResponseTransportadoraDto } from '../dto/responseTransportadora.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportadoraPrismaRepository
  implements IDevolucaoTransportadorasRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(nome: string, centerId: string): Promise<string> {
    const addTransportadora = await this.prisma.devolucaoTransportadoras.create(
      {
        data: {
          nome,
          centerId,
        },
      },
    );
    return addTransportadora.id.toString();
  }

  async findAllByCenter(centerId: string): Promise<ResponseTransportadoraDto> {
    console.log('centerId', centerId);
    const transportadoras =
      await this.prisma.devolucaoTransportadoras.findMany();

    return transportadoras.map((transportadora) => ({
      id: transportadora.id,
      nome: transportadora.nome,
      centerId: transportadora.centerId,
    }));
  }

  async edit(id: number, nome: string): Promise<void> {
    await this.prisma.devolucaoTransportadoras.update({
      where: { id },
      data: { nome },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.devolucaoTransportadoras.delete({
      where: { id },
    });
  }
}
