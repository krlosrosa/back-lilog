import { Field, ObjectType } from '@nestjs/graphql';
import {
  StatusDemanda,
  StatusPalete,
  TipoProcesso,
  Turno,
} from '../enums/produtividade.enums';

@ObjectType()
export class PausaModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  inicio: string;

  @Field(() => String, { nullable: true })
  fim: string | null;

  @Field(() => String)
  motivo: string | null;

  @Field(() => String)
  descricao: string | null;

  @Field(() => String)
  registradoPorId: string;

  @Field(() => String, { nullable: true })
  pausaGeralId: number | null;
}

@ObjectType()
export class PaleteModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  empresa: string;

  @Field(() => Number)
  quantidadeCaixas: number;

  @Field(() => Number)
  quantidadeUnidades: number;

  @Field(() => Number)
  quantidadePaletes: number;

  @Field(() => Number)
  enderecoVisitado: number;

  @Field(() => String)
  segmento: string;

  @Field(() => String)
  transporteId: string;

  @Field(() => String)
  tipoProcesso: TipoProcesso;

  @Field(() => String)
  criadoEm: string;

  @Field(() => String)
  atualizadoEm: string;

  @Field(() => String)
  status: StatusPalete;

  @Field(() => Boolean)
  validado: boolean;

  @Field(() => String)
  criadoPorId: string;
}

@ObjectType()
export class InfoDemandaModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  processo: TipoProcesso;

  @Field(() => String)
  inicio: string;

  @Field(() => String, { nullable: true })
  fim: string | null;

  @Field(() => String)
  status: StatusDemanda;

  @Field(() => String)
  cadastradoPorId: string;

  @Field(() => String)
  turno: Turno;

  @Field(() => String)
  funcionarioId: string;

  @Field(() => String)
  funcionario: string;

  @Field(() => String)
  criadoEm: string;

  @Field(() => String)
  centerId: string;

  @Field(() => String, { nullable: true })
  obs: string | null;

  @Field(() => Number)
  tempoTrabalhado: number;

  @Field(() => Number)
  tempoPausas: number;

  @Field(() => Number)
  tempoTotal: number;

  @Field(() => Number)
  produtividade: number;

  @Field(() => [PausaModel])
  pausas: PausaModel[];

  @Field(() => [PaleteModel])
  paletes: PaleteModel[];
}
