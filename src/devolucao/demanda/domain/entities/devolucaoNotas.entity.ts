// Definição das propriedades da entidade
export interface DevolucaoNotasProps {
  id: number;
  empresa: string; // pode ser enum ou value object no futuro
  devolucaoDemandaId: number;
  notaFiscal: string;
  motivoDevolucao: string;
  descMotivoDevolucao?: string | null;
  nfParcial?: string | null;
  idViagemRavex?: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
  tipo: string; // pode ser enum TipoDevolucaoNotas no futuro
}

// Entidade de domínio (anêmica)
export class DevolucaoNotasEntity {
  private props: DevolucaoNotasProps;

  constructor(props: DevolucaoNotasProps) {
    this.props = {
      ...props,
    };
  }

  static fromPrimitives(props: DevolucaoNotasProps): DevolucaoNotasEntity {
    return new DevolucaoNotasEntity(props);
  }

  // getters (somente leitura)
  get id(): number {
    return this.props.id;
  }

  get empresa(): string {
    return this.props.empresa;
  }

  get devolucaoDemandaId(): number {
    return this.props.devolucaoDemandaId;
  }

  get notaFiscal(): string {
    return this.props.notaFiscal;
  }

  get motivoDevolucao(): string {
    return this.props.motivoDevolucao;
  }

  get descMotivoDevolucao(): string | null | undefined {
    return this.props.descMotivoDevolucao;
  }

  get nfParcial(): string | null | undefined {
    return this.props.nfParcial;
  }

  get idViagemRavex(): string | null | undefined {
    return this.props.idViagemRavex;
  }

  get criadoEm(): Date {
    return this.props.criadoEm;
  }

  get atualizadoEm(): Date {
    return this.props.atualizadoEm;
  }

  get tipo(): string {
    return this.props.tipo;
  }
}
