import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { PwaItensEntity } from './pwaItens.entity';

// Definição das propriedades da entidade
export interface PwaNotasProps {
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
  tipo: TipoDevolucaoNotas;
  pwaItens: PwaItensEntity[];
}

// Entidade de domínio (anêmica)
export class PwaNotasEntity {
  private props: PwaNotasProps;

  constructor(props: PwaNotasProps) {
    this.props = {
      ...props,
    };
  }

  static fromPrimitives(props: PwaNotasProps): PwaNotasEntity {
    return new PwaNotasEntity(props);
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

  get tipo(): TipoDevolucaoNotas {
    return this.props.tipo;
  }

  get itens(): PwaItensEntity[] {
    return this.props.pwaItens;
  }
}
