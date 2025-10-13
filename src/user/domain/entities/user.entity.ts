import { RoleCenter, Turno } from 'src/produtividade/enums/produtividade.enums';

export class UserEntity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _centerId: string;
  private readonly _turno: Turno;
  private readonly _role: RoleCenter[];

  constructor(params: UserEntityType) {
    this._id = params.id;
    this._name = params.name;
    this._centerId = params.centerId;
    this._turno = params.turno;
    this._role = params.role;
  }

  static create(params: UserEntityType): UserEntity {
    return new UserEntity(params);
  }

  get turno(): Turno {
    return this._turno;
  }

  get name(): string {
    return this._name;
  }

  get center(): string {
    return this._centerId;
  }

  get roles(): RoleCenter[] {
    return this._role;
  }

  get id(): string {
    return this._id;
  }
}

type UserEntityType = {
  id: string;
  name: string;
  centerId: string;
  role: RoleCenter[];
  turno: Turno;
};
