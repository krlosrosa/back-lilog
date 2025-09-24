import { PaleteEntity } from './palete.entity';
import {
  StatusDemanda,
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';
import { PausaEntity } from './pausa.entity';

export class DemandaEntity {
  private readonly _id: number;
  private readonly _processo: TipoProcesso;
  private readonly _inicio: Date;
  private readonly _dataRegistro: string;
  private _fim?: Date | null;
  private readonly _cadastradoPorId: string;
  private readonly _turno: Turno;
  private readonly _funcionarioId: string;
  private readonly _funcionario: string;
  private _status: StatusDemanda;
  private readonly _centerId: string;
  private _obs?: string | null;
  private readonly _paletes?: PaleteEntity[];
  private readonly _pausas?: PausaEntity[];
  private readonly _criadoEm: Date;
  constructor(params: DemandaEntityType) {
    this._id = params.id;
    this._processo = params.processo;
    this._inicio = params.inicio;
    this._dataRegistro = params.dataRegistro;
    this._fim = params.fim;
    this._cadastradoPorId = params.cadastradoPorId;
    this._turno = params.turno;
    this._funcionarioId = params.funcionarioId;
    this._funcionario = params.funcionario;
    this._centerId = params.centerId;
    this._obs = params.obs;
    this._criadoEm = params.criadoEm;
    this._paletes = params.paletes;
    this._pausas = params.pausas;
    this._status = params.status;
  }

  static create(params: DemandaEntityType): DemandaEntity {
    return new DemandaEntity(params);
  }

  public finalizarPausa(): PausaEntity | null {
    const pausa = this._pausas?.find(
      (pausa) => pausa.fim === null || pausa.fim === undefined,
    );

    if (!pausa) {
      return null;
    }

    pausa.finalizarPausa();
    return pausa;
  }

  public validarPausa(): boolean {
    const pausaAberta = this._pausas?.filter(
      (pausa) => pausa.fim === null || pausa.fim === undefined,
    );

    if (!pausaAberta || pausaAberta.length === 0) {
      return true;
    }

    if (pausaAberta.length > 0) {
      const motivo = pausaAberta.every(
        (pausa) => pausa.motivo === 'FALTA_DE_MATERIAL',
      );

      if (!motivo) {
        return false;
      }
    }

    return true;
  }

  public quantidadeDemandas(): number {
    return this._paletes?.length ?? 0;
  }

  public calcularTempoTotal(): number {
    return this._fim
      ? this._fim.getTime() - this._inicio.getTime()
      : new Date().getTime() - this._inicio.getTime();
  }

  public calcularTempoPausas(): number {
    return (
      this._pausas?.reduce(
        (acc, pausa) =>
          acc +
          (pausa.fim
            ? pausa.fim.getTime() - pausa.inicio.getTime()
            : new Date().getTime() - pausa.inicio.getTime()),
        0,
      ) ?? 0
    );
  }

  public quantidadeCaixas(): number {
    return this._paletes?.reduce((acc, palete) => acc + palete.caixas, 0) ?? 0;
  }

  public quantidadeUnidades(): number {
    return (
      this._paletes?.reduce((acc, palete) => acc + palete.unidades, 0) ?? 0
    );
  }

  public quantidadePausas(): number {
    return this._pausas?.length ?? 0;
  }

  public calcularTempoTrabalhado(): number {
    const tempototal = this.calcularTempoTotal();
    const tempoPausas = this.calcularTempoPausas();
    return tempototal - tempoPausas;
  }

  public calcularProdutividade(): number {
    const tempototal = this.calcularTempoTrabalhado();
    const horas = tempototal / 3600000;
    return this.quantidadeCaixas() / horas;
  }

  public quantidadePaletes(): number {
    return this._paletes?.reduce((acc, palete) => acc + palete.paletes, 0) ?? 0;
  }

  public quantidadeVisitas(): number {
    return this._paletes?.reduce((acc, palete) => acc + palete.visitas, 0) ?? 0;
  }

  public finalizarDemanda(obs?: string): void {
    this._status = StatusDemanda.FINALIZADA;
    this._fim = new Date();
    this._obs = obs ?? null;
  }

  // GETTERS
  get id(): number {
    return this._id;
  }

  get paletes(): PaleteEntity[] | undefined {
    return this._paletes;
  }

  get status(): StatusDemanda {
    return this._status;
  }

  get processo(): TipoProcesso {
    return this._processo;
  }

  get dataRegistro(): string {
    return this._dataRegistro;
  }

  get inicio(): Date {
    return this._inicio;
  }

  get fim(): Date | null | undefined {
    return this._fim;
  }

  get cadastradoPorId(): string {
    return this._cadastradoPorId;
  }

  get turno(): Turno {
    return this._turno;
  }

  get funcionarioId(): string {
    return this._funcionarioId;
  }

  get funcionario(): string {
    return this._funcionario;
  }

  get centerId(): string {
    return this._centerId;
  }

  get obs(): string | null | undefined {
    return this._obs;
  }

  get pausas(): PausaEntity[] | undefined {
    return this._pausas;
  }

  get empresa(): string {
    return this._paletes?.[0]?.empresa ?? '';
  }

  get segmento(): string {
    return this._paletes?.[0]?.segmento ?? '';
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }
}

type DemandaEntityType = {
  id: number;
  paletes?: PaleteEntity[];
  processo: TipoProcesso;
  inicio: Date;
  dataRegistro: string;
  fim?: Date | null;
  cadastradoPorId: string;
  turno: Turno;
  funcionarioId: string;
  funcionario: string;
  centerId: string;
  status: StatusDemanda;
  obs?: string | null;
  pausas?: PausaEntity[];
  criadoEm: Date;
};
