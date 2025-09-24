import { DevolucaoCheckListEntity } from './devolucaCheckList.entity';
import { DevolucaoItensEntity } from './devolucaoItens.entity';
import { DevolucaoNotasEntity } from './devolucaoNotas.entity';

// Definição das propriedades da entidade
export interface DevolucaoDemandaProps {
  id: number;
  placa: string;
  motorista: string;
  idTransportadora?: string | null;
  telefone?: string | null;
  cargaSegregada: boolean;
  retornoPalete: boolean;
  quantidadePaletes?: number | null;
  centerId: string;
  adicionadoPorId: string;
  conferenteId?: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
  status: string; // pode ser um enum depois
  fechouComAnomalia?: boolean | null;
  liberadoParaConferenciaEm?: Date | null;
  inicioConferenciaEm?: Date | null;
  fimConferenciaEm?: Date | null;
  finalizadoEm?: Date | null;
  senha: string;
  devolucaoNotas?: DevolucaoNotasEntity[];
  devolucaoItens?: DevolucaoItensEntity[];
  devolucaoCheckList?: DevolucaoCheckListEntity | null;
}

// Entidade de domínio (anêmica)
export class DevolucaoDemandaEntity {
  // propriedades privadas
  private props: DevolucaoDemandaProps;

  constructor(props: DevolucaoDemandaProps) {
    this.props = {
      ...props,
      quantidadePaletes: props.quantidadePaletes ?? 0,
      cargaSegregada: props.cargaSegregada ?? false,
      retornoPalete: props.retornoPalete ?? false,
    };
  }

  static fromPrimitives(props: DevolucaoDemandaProps): DevolucaoDemandaEntity {
    return new DevolucaoDemandaEntity(props);
  }

  // getters públicos (somente leitura)
  get id(): number {
    return this.props.id;
  }

  get placa(): string {
    return this.props.placa;
  }

  get motorista(): string {
    return this.props.motorista;
  }

  get idTransportadora(): string | null | undefined {
    return this.props.idTransportadora;
  }

  get telefone(): string | null | undefined {
    return this.props.telefone;
  }

  get cargaSegregada(): boolean {
    return this.props.cargaSegregada;
  }

  get retornoPalete(): boolean {
    return this.props.retornoPalete;
  }

  get quantidadePaletes(): number | null | undefined {
    return this.props.quantidadePaletes;
  }

  get centerId(): string {
    return this.props.centerId;
  }

  get adicionadoPorId(): string {
    return this.props.adicionadoPorId;
  }

  get conferenteId(): string | null | undefined {
    return this.props.conferenteId;
  }

  get criadoEm(): Date {
    return this.props.criadoEm;
  }

  get atualizadoEm(): Date {
    return this.props.atualizadoEm;
  }

  get status(): string {
    return this.props.status;
  }

  get fechouComAnomalia(): boolean | null | undefined {
    return this.props.fechouComAnomalia;
  }

  get liberadoParaConferenciaEm(): Date | null | undefined {
    return this.props.liberadoParaConferenciaEm;
  }

  get inicioConferenciaEm(): Date | null | undefined {
    return this.props.inicioConferenciaEm;
  }

  get fimConferenciaEm(): Date | null | undefined {
    return this.props.fimConferenciaEm;
  }

  get finalizadoEm(): Date | null | undefined {
    return this.props.finalizadoEm;
  }

  get senha(): string {
    return this.props.senha;
  }

  get devolucaoNotas(): DevolucaoNotasEntity[] | undefined {
    return this.props.devolucaoNotas;
  }

  get devolucaoItens(): DevolucaoItensEntity[] | undefined {
    return this.props.devolucaoItens;
  }

  get devolucaoCheckList(): DevolucaoCheckListEntity | null | undefined {
    return this.props.devolucaoCheckList;
  }
}
