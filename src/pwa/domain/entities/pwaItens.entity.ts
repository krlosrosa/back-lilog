// Definição das propriedades da entidade
export interface PwaItensProps {
  id: number;
  sku: string;
  descricao: string;
  lote?: string | null;
  fabricacao?: Date | null;
  sif?: string | null;
  quantidadeCaixas?: number | null;
  quantidadeUnidades?: number | null;
  tipo: string; // pode ser enum TipoDevolucaoItens
  devolucaoNotasId?: string | null;
  demandaId: number;
  avariaCaixas?: number | null;
  avariaUnidades?: number | null;
}

// Entidade de domínio (anêmica)
export class PwaItensEntity {
  private props: PwaItensProps;

  constructor(props: PwaItensProps) {
    this.props = {
      ...props,
      quantidadeCaixas: props.quantidadeCaixas ?? 0,
      quantidadeUnidades: props.quantidadeUnidades ?? 0,
      avariaCaixas: props.avariaCaixas ?? 0,
      avariaUnidades: props.avariaUnidades ?? 0,
    };
  }

  static fromPrimitives(props: PwaItensProps): PwaItensEntity {
    return new PwaItensEntity(props);
  }

  // Getters (somente leitura)
  get id(): number {
    return this.props.id;
  }

  get sku(): string {
    return this.props.sku;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get lote(): string | null | undefined {
    return this.props.lote;
  }

  get fabricacao(): Date | null | undefined {
    return this.props.fabricacao;
  }

  get sif(): string | null | undefined {
    return this.props.sif;
  }

  get quantidadeCaixas(): number | null | undefined {
    return this.props.quantidadeCaixas;
  }

  get quantidadeUnidades(): number | null | undefined {
    return this.props.quantidadeUnidades;
  }

  get tipo(): string {
    return this.props.tipo;
  }

  get devolucaoNotasId(): string | null | undefined {
    return this.props.devolucaoNotasId;
  }

  get demandaId(): number {
    return this.props.demandaId;
  }

  get avariaCaixas(): number | null | undefined {
    return this.props.avariaCaixas;
  }

  get avariaUnidades(): number | null | undefined {
    return this.props.avariaUnidades;
  }
}
