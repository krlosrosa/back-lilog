import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { IAnomaliaProdutividadeRepositoryCenter } from 'src/anomalias_produtividade/domain/repositories/IAnomaliaProdutividadeRepositoryCenter.repository';
import { CriarAnomaliaZodDto } from 'src/anomalias_produtividade/dtos/criarAnomalia';

@Injectable()
export class AnomaliaPrismaProdutividadePrismaRepository
  implements IAnomaliaProdutividadeRepositoryCenter
{
  constructor(private readonly prisma: PrismaService) {}

  async adicionarAnomalia(anomalias: CriarAnomaliaZodDto[]): Promise<void> {
    await this.prisma.anomaliaProdutividade.createMany({
      data: anomalias,
    });
  }
}
