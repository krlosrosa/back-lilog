// Definição das propriedades da entidade
export interface DevolucaoCheckListProps {
  id: number;
  temperaturaBau: number;
  temperaturaProduto: number;
  demandaId: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

// Entidade de domínio (anêmica)
export class DevolucaoCheckListEntity {
  private props: DevolucaoCheckListProps;

  constructor(props: DevolucaoCheckListProps) {
    this.props = {
      ...props,
    };
  }

  static fromPrimitives(
    props: DevolucaoCheckListProps,
  ): DevolucaoCheckListEntity {
    return new DevolucaoCheckListEntity(props);
  }

  // getters (somente leitura)
  get id(): number {
    return this.props.id;
  }

  get temperaturaBau(): number {
    return this.props.temperaturaBau;
  }

  get temperaturaProduto(): number {
    return this.props.temperaturaProduto;
  }

  get demandaId(): number {
    return this.props.demandaId;
  }

  get criadoEm(): Date {
    return this.props.criadoEm;
  }

  get atualizadoEm(): Date {
    return this.props.atualizadoEm;
  }
}
