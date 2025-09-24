import { User as UserPrisma } from '@prisma/client';
import { Turno } from 'src/produtividade/enums/produtividade.enums';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class UserMapper {
  static fromPrismaToEntity(user: UserPrisma): UserEntity {
    return UserEntity.create({
      centerId: user.centerId,
      id: user.id,
      name: user.name,
      turno: user.turno as Turno,
    });
  }
}
