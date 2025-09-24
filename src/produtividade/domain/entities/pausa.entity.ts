export class PausaEntity {
  private readonly _id: number;
  private readonly _motivo: string;
  private readonly _descricao?: string;
  private readonly _inicio: Date;
  private _fim?: Date;
  private readonly _registradoPorId: string;

  constructor(props: PausaProps) {
    this._id = props.id ?? 0;
    this._motivo = props.motivo;
    this._descricao = props.descricao;
    this._registradoPorId = props.registradoPorId;
    this._inicio = props.inicio;
    this._fim = props.fim;
  }

  static create(props: PausaProps): PausaEntity {
    return new PausaEntity(props);
  }

  public finalizarPausa(): void {
    this._fim = new Date();
  }

  get id(): number {
    return this._id;
  }

  get motivo(): string {
    return this._motivo;
  }

  get descricao(): string | undefined {
    return this._descricao;
  }

  get inicio(): Date {
    return this._inicio;
  }

  get fim(): Date | undefined {
    return this._fim;
  }

  get registradoPorId(): string {
    return this._registradoPorId;
  }
}

export interface PausaProps {
  id?: number;
  inicio: Date;
  fim?: Date;
  motivo: string;
  descricao?: string;
  registradoPorId: string;
}
