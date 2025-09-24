import { Turno } from 'src/produtividade/enums/produtividade.enums';

export class UserEntity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _centerId: string;
  private readonly _turno: Turno;

  constructor(params: UserEntityType) {
    this._id = params.id;
    this._name = params.name;
    this._centerId = params.centerId;
    this._turno = params.turno;
  }

  static create(params: UserEntityType): UserEntity {
    return new UserEntity(params);
  }

  get turno(): Turno {
    return this._turno;
  }
}

type UserEntityType = {
  id: string;
  name: string;
  centerId: string;
  turno: Turno;
};
