import type {
  StatusPalete,
  TipoProcesso,
} from 'src/produtividade/enums/produtividade.enums';

export class PaleteEntity {
  private readonly _id: string;
  private readonly _status: StatusPalete;
  private readonly _demandaId: number;
  private readonly _processo: TipoProcesso;
  private readonly _caixas: number;
  private readonly _unidades: number;
  private readonly _paletes: number;
  private readonly _empresa: string;
  private readonly _segmento: string;
  private readonly _visitas: number;
  private readonly _criadoEm: Date;
  private readonly _atualizadoEm: Date;
  private readonly _criadoPorId: string;
  private readonly _validado: boolean;
  private readonly _transporteId: string;

  constructor(params: PaleteEntityType) {
    this._id = params.id;
    this._status = params.status;
    this._demandaId = params.demandaId;
    this._processo = params.processo;
    this._caixas = params.caixas;
    this._unidades = params.unidades;
    this._paletes = params.paletes;
    this._empresa = params.empresa;
    this._segmento = params.segmento;
    this._visitas = params.visitas;
    this._criadoEm = params.criadoEm;
    this._atualizadoEm = params.atualizadoEm;
    this._criadoPorId = params.criadoPorId;
    this._validado = params.validado;
    this._transporteId = params.transporteId;
  }

  static create(params: PaleteEntityType): PaleteEntity {
    return new PaleteEntity(params);
  }

  // GETTERS
  get id(): string {
    return this._id;
  }

  get status(): StatusPalete {
    return this._status;
  }

  get demandaId(): number {
    return this._demandaId;
  }

  get processo(): TipoProcesso {
    return this._processo;
  }

  get caixas(): number {
    return this._caixas;
  }

  get unidades(): number {
    return this._unidades;
  }

  get paletes(): number {
    return this._paletes;
  }

  get empresa(): string {
    return this._empresa;
  }

  get segmento(): string {
    return this._segmento;
  }

  get visitas(): number {
    return this._visitas;
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }

  get atualizadoEm(): Date {
    return this._atualizadoEm;
  }

  get criadoPorId(): string {
    return this._criadoPorId;
  }

  get validado(): boolean {
    return this._validado;
  }

  get transporteId(): string {
    return this._transporteId;
  }
}

type PaleteEntityType = {
  id: string;
  status: StatusPalete;
  demandaId: number;
  processo: TipoProcesso;
  caixas: number;
  unidades: number;
  paletes: number;
  empresa: string;
  segmento: string;
  visitas: number;
  criadoEm: Date;
  atualizadoEm: Date;
  criadoPorId: string;
  validado: boolean;
  transporteId: string;
};
