import { Injectable } from '@nestjs/common';
import { ICenterRepository } from 'src/centro/domain/repositories/center.respository';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { EditarCentroDto } from 'src/centro/dto/editarCentro.dto';
import { DefinirConfiguracaoImpressaoDto } from 'src/centro/dto/definirConfiguracaoCentro.dto';
import { CriarNovoCentroZodDto } from 'src/centro/dto/criarNovoCentro.schema';
import { ExibirInfoEnum } from 'src/_shared/enums/ExibiInfo.enum';

@Injectable()
export class CenterPrismaRepository implements ICenterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(center: CriarNovoCentroZodDto): Promise<CriarNovoCentroZodDto> {
    await this.prisma.center.create({
      data: center,
    });
    return Promise.resolve(center);
  }

  async edit(params: EditarCentroDto, centerId: string): Promise<boolean> {
    await this.prisma.center.update({
      where: { centerId },
      data: params,
    });
    return Promise.resolve(true);
  }

  async delete(centerId: string): Promise<boolean> {
    await this.prisma.center.delete({
      where: { centerId },
    });
    return Promise.resolve(true);
  }

  async definirConfiguracaoImpressao(
    configuracao: DefinirConfiguracaoImpressaoDto,
    centerId: string,
    atribuidoPorId: string,
  ): Promise<boolean> {
    await this.prisma.configuracaoImpressaoMapa.upsert({
      where: { centerId },
      update: {
        ...configuracao,
        atribuidoPorId,
        dataMaximaPercentual: configuracao.dataMaximaPercentual ?? 0,
      },
      create: {
        ...configuracao,
        centerId,
        atribuidoPorId,
        dataMaximaPercentual: configuracao.dataMaximaPercentual ?? 0,
      },
    });
    return Promise.resolve(true);
  }

  async buscarConfiguracoesPorCentro(
    centerId: string,
  ): Promise<Omit<DefinirConfiguracaoImpressaoDto, 'id'>> {
    const configuracao = await this.prisma.configuracaoImpressaoMapa.findUnique(
      {
        where: { centerId },
      },
    );
    //@ts-expect-error
    const { id, ...rest } = configuracao;
    return {
      ...rest,
      exibirInfoCabecalho: rest.exibirInfoCabecalho ?? ExibirInfoEnum.NENHUM,
      valorQuebra: rest.valorQuebra?.toNumber() ?? null,
    };
  }

  async findAll(): Promise<CriarNovoCentroZodDto[]> {
    const centros = await this.prisma.center.findMany();
    return centros as CriarNovoCentroZodDto[];
  }
}
