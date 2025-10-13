import { User as UserPrisma, UserCenter } from '@prisma/client';
import { RoleCenter, Turno } from 'src/produtividade/enums/produtividade.enums';
import { UserEntity } from 'src/user/domain/entities/user.entity';

type UserWithRoles = UserPrisma & {
  roles: UserCenter[];
};

export class UserMapper {
  static fromPrismaToEntity(user: UserWithRoles): UserEntity {
    return UserEntity.create({
      centerId: user.centerId,
      id: user.id,
      name: user.name,
      turno: user.turno as Turno,
      role: user.roles.map((role) => role.role as RoleCenter),
    });
  }
}
