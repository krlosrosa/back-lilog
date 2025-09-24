import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { PaleteEntity } from 'src/produtividade/domain/entities/palete.entity';
import {
  StatusDemanda,
  StatusPalete,
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { CriarNovoFuncionarioZodDto } from 'src/user/dto/criarNovoFuncionario.dto';
import { ResponseInfoMeZodDto, Role } from 'src/user/dto/responseInfoMe';
import { ListarFuncionariosPorCentroZodDto } from 'src/user/dto/user';
import { CriarFuncionariosEmMassaZodDto } from 'src/user/dto/criarFuncionariosEmMassa.dto';
import { ListarPermissionsZodDto } from 'src/user/dto/listarPermissions.dto';
import { CriarFuncionarioAdmZodDto } from 'src/user/dto/criarFuncionarioAdm.dto';
import { AtribuirCentroAFuncionarioZodDto } from 'src/user/dto/atribuirCentroAFuncionario.dto';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criarNovoFuncionario(
    command: CriarNovoFuncionarioZodDto,
  ): Promise<CriarNovoFuncionarioZodDto> {
    const funcionario = await this.prisma.user.create({
      data: {
        name: command.nome,
        turno: command.turno as Turno,
        centerId: command.centerId,
        id: command.id,
        assignedCenters: {
          create: {
            role: command.role as Role,
            centerId: command.centerId,
          },
        },
      },
      include: {
        assignedCenters: true,
      },
    });
    return {
      centerId: funcionario.centerId,
      id: funcionario.id,
      nome: funcionario.name,
      turno: funcionario.turno as Turno,
      role: funcionario.assignedCenters[0].role as Role,
    };
  }

  async criarFuncionarioAdm(
    command: CriarFuncionarioAdmZodDto,
  ): Promise<CriarNovoFuncionarioZodDto> {
    const funcionario = await this.prisma.user.create({
      data: {
        name: command.nome,
        turno: command.turno as Turno,
        centerId: command.centerId,
        id: command.id,
        assignedCenters: {
          create: {
            role: 'USER',
            centerId: command.centerId,
          },
        },
      },
      include: {
        assignedCenters: true,
      },
    });
    return {
      centerId: funcionario.centerId,
      id: funcionario.id,
      nome: funcionario.name,
      turno: funcionario.turno as Turno,
      role: funcionario.assignedCenters[0].role as Role,
    };
  }

  async criarFuncionariosEmMassa(
    params: CriarFuncionariosEmMassaZodDto,
  ): Promise<void> {
    const users = params.users.map((user) => ({
      id: user.id,
      name: user.name,
      turno: user.turno as Turno,
      centerId: params.centerId,
    }));
    return this.prisma.$transaction(async (tx) => {
      await tx.user.createMany({
        data: users,
        skipDuplicates: true,
      });
      await tx.userCenter.createMany({
        data: users.map((user) => ({
          userId: user.id,
          centerId: params.centerId,
          role: Role.FUNCIONARIO,
        })),
        skipDuplicates: true,
      });
    });
  }

  async atribuirCentroAFuncionario(
    command: AtribuirCentroAFuncionarioZodDto,
  ): Promise<void> {
    await this.prisma.userCenter.create({
      data: {
        userId: command.userId,
        centerId: command.centerId,
        role: command.role,
        processo: 'EXPEDICAO',
      },
    });
  }

  async removerFuncionarioDoCentro(
    userId: string,
    centerId: string,
  ): Promise<void> {
    await this.prisma.userCenter.delete({
      where: {
        userId_centerId_processo: { userId, centerId, processo: 'EXPEDICAO' },
      },
    });
  }

  async buscarPorId(id: string, centerId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        centerId,
      },
    });
    if (!user) return null;
    return UserEntity.create({
      id: user.id,
      name: user.name,
      centerId: user.centerId,
      turno: user.turno as Turno,
    });
  }

  async buscarPorIdEAssociadoADemanda(
    id: string,
    centerId: string,
  ): Promise<DemandaEntity | null> {
    const demanda = await this.prisma.demanda.findFirst({
      where: {
        funcionarioId: id,
        centerId,
        OR: [
          {
            status: 'EM_PROGRESSO',
          },
          {
            status: 'PAUSA',
          },
        ],
      },
      include: {
        paletes: true,
        funcionario: true,
      },
    });

    if (!demanda) return null;
    return DemandaEntity.create({
      id: demanda.id,
      dataRegistro: demanda.inicio.toISOString(),
      status: demanda.status as StatusDemanda,
      cadastradoPorId: demanda.cadastradoPorId,
      processo: demanda.processo as TipoProcesso,
      inicio: demanda.inicio,
      turno: demanda.turno as Turno,
      funcionarioId: demanda.funcionarioId,
      centerId: demanda.centerId,
      funcionario: demanda.funcionario.name,
      criadoEm: demanda.criadoEm,
      fim: demanda.fim ?? undefined,
      obs: demanda.obs ?? undefined,
      paletes: demanda.paletes.map((palete) =>
        PaleteEntity.create({
          empresa: palete.empresa,
          caixas: palete.quantidadeCaixas,
          unidades: palete.quantidadeUnidades,
          paletes: palete.quantidadePaletes,
          segmento: palete.segmento,
          visitas: palete.enderecoVisitado,
          id: palete.id,
          demandaId: palete.demandaId ?? 0,
          status: palete.status as StatusPalete,
          processo: palete.tipoProcesso as TipoProcesso,
          atualizadoEm: palete.atualizadoEm,
          criadoEm: palete.criadoEm,
          criadoPorId: palete.criadoPorId,
          validado: palete.validado,
          transporteId: palete.transporteId,
        }),
      ),
    });
  }

  async getInfoMe(id: string): Promise<ResponseInfoMeZodDto> {
    const user = await this.prisma.userCenter.findMany({
      where: { userId: id },
    });

    return {
      listCenterRole: user.map((userCenter) => ({
        centerId: userCenter.centerId,
        role: userCenter.role as Role,
        processo: userCenter.processo,
      })),
    };
  }

  async listarFuncionariosPorCentro(
    centerId: string,
  ): Promise<ListarFuncionariosPorCentroZodDto> {
    const funcionarios = await this.prisma.userCenter.findMany({
      where: { centerId },
      include: {
        user: true,
      },
    });
    return funcionarios.map((funcionario) => ({
      id: funcionario.user.id,
      name: funcionario.user.name,
      centerId: funcionario.centerId,
      role: funcionario.role as Role,
      turno: funcionario.user.turno as Turno,
    }));
  }

  async listarFuncionariosAdmPorCentro(
    centerId: string,
  ): Promise<ListarFuncionariosPorCentroZodDto> {
    const funcionarios = await this.prisma.userCenter.findMany({
      where: { centerId, role: 'USER' },
      include: {
        user: true,
      },
    });
    return funcionarios.map((funcionario) => ({
      id: funcionario.user.id,
      name: funcionario.user.name,
      centerId: funcionario.centerId,
      role: funcionario.role as Role,
      turno: funcionario.user.turno as Turno,
    }));
  }

  async deletarUsuario(userId: string, centerId: string): Promise<void> {
    await this.prisma.userCenter.deleteMany({
      where: {
        userId,
        centerId,
      },
    });
  }

  async listarPermissoesParaCasl(
    userId: string,
    centerId: string,
  ): Promise<ListarPermissionsZodDto[]> {
    const userCenters = await this.prisma.userCenter.findMany({
      where: { userId, centerId },
    });
    return userCenters.map((userCenter) => ({
      id: userCenter.userId,
      processo: userCenter.processo,
      role: userCenter.role as Role,
    }));
  }
}
