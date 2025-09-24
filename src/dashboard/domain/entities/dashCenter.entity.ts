import {
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';

export class DashCenterEntity {
  private readonly _id?: number | null;
  private readonly _dataRegistro: string;
  private readonly _centerId: string;
  private readonly _totalCaixas: number;
  private readonly _totalUnidades: number;
  private readonly _totalPaletes: number;
  private readonly _totalEnderecos: number;
  private readonly _totalPausasQuantidade: number;
  private readonly _totalPausasTempo: number;
  private readonly _totalTempoTrabalhado: number;
  private readonly _totalDemandas: number;
  private readonly _processo: TipoProcesso;
  private readonly _turno: Turno;

  constructor(params: DashCenterEntityType) {
    this._id = params.id;
    this._dataRegistro = params.dataRegistro;
    this._centerId = params.centerId;
    this._totalCaixas = params.totalCaixas;
    this._totalUnidades = params.totalUnidades;
    this._totalPaletes = params.totalPaletes;
    this._totalEnderecos = params.totalEnderecos;
    this._totalPausasQuantidade = params.totalPausasQuantidade;
    this._totalPausasTempo = params.totalPausasTempo;
    this._totalTempoTrabalhado = params.totalTempoTrabalhado;
    this._totalDemandas = params.totalDemandas;
    this._processo = params.processo;
    this._turno = params.turno;
  }

  static create(params: DashCenterEntityType): DashCenterEntity {
    return new DashCenterEntity(params);
  }

  get id(): number | null {
    return this._id ?? null;
  }

  get dataRegistro(): string {
    return this._dataRegistro;
  }

  get centerId(): string {
    return this._centerId;
  }

  get totalCaixas(): number {
    return this._totalCaixas;
  }

  get totalUnidades(): number {
    return this._totalUnidades;
  }

  get totalPaletes(): number {
    return this._totalPaletes;
  }

  get totalEnderecos(): number {
    return this._totalEnderecos;
  }

  get totalPausasQuantidade(): number {
    return this._totalPausasQuantidade;
  }

  get totalPausasTempo(): number {
    return this._totalPausasTempo;
  }

  get totalTempoTrabalhado(): number {
    return this._totalTempoTrabalhado;
  }

  get totalDemandas(): number {
    return this._totalDemandas;
  }

  get processo(): TipoProcesso {
    return this._processo;
  }

  get turno(): Turno {
    return this._turno;
  }
}

type DashCenterEntityType = {
  id?: number | null;
  dataRegistro: string;
  centerId: string;
  totalCaixas: number;
  totalUnidades: number;
  totalPaletes: number;
  totalEnderecos: number;
  totalPausasQuantidade: number;
  totalPausasTempo: number;
  totalTempoTrabalhado: number;
  totalDemandas: number;
  processo: TipoProcesso;
  turno: Turno;
};
