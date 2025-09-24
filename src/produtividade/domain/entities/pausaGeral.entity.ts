import {
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';
import { PausaEntity } from './pausa.entity';

export class PausaGeralEntity {
  private _id: number;
  private _inicio: Date;
  private _fim: Date | null;
  private _motivo: string | null;
  private _centerId: string;
  private _processo: TipoProcesso;
  private _turno: Turno;
  private _registradoPorId: string;
  private _pausas?: PausaEntity[];

  constructor(props: PausaGeralProps) {
    this._id = props.id ?? 0;
    this._inicio = props.inicio;
    this._fim = props.fim ?? null;
    this._motivo = props.motivo;
    this._centerId = props.centerId;
    this._processo = props.processo;
    this._turno = props.turno;
    this._registradoPorId = props.registradoPorId;
    this._pausas = props.pausas ?? [];
  }

  static create(props: PausaGeralProps): PausaGeralEntity {
    return new PausaGeralEntity(props);
  }

  public adicionarPausa(): void {
    this._fim = new Date();
  }

  get id(): number {
    return this._id;
  }

  get inicio(): Date {
    return this._inicio;
  }

  get fim(): Date | null {
    return this._fim;
  }

  get motivo(): string | null {
    return this._motivo;
  }

  get centerId(): string {
    return this._centerId;
  }

  get processo(): TipoProcesso {
    return this._processo;
  }

  get turno(): Turno {
    return this._turno;
  }

  get registradoPorId(): string {
    return this._registradoPorId;
  }

  get pausas(): PausaEntity[] | undefined {
    return this._pausas;
  }
}

export interface PausaGeralProps {
  id: number;
  inicio: Date;
  fim: Date | null;
  motivo: string | null;
  centerId: string;
  processo: TipoProcesso;
  turno: Turno;
  registradoPorId: string;
  pausas?: PausaEntity[];
}
