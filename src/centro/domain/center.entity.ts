export class CenterEntity {
  private readonly _centerId: string;
  private readonly _description: string;
  private readonly _state: string;
  private readonly _cluster: string;

  constructor(params: CenterEntityType) {
    this._centerId = params.centerId;
    this._description = params.description;
    this._state = params.state;
    this._cluster = params.cluster;
  }

  static create(params: CenterEntityType): CenterEntity {
    return new CenterEntity(params);
  }

  get centerId(): string {
    return this._centerId;
  }

  get description(): string {
    return this._description;
  }

  get state(): string {
    return this._state;
  }

  get cluster(): string {
    return this._cluster;
  }
}

type CenterEntityType = {
  centerId: string;
  description: string;
  state: string;
  cluster: string;
};
