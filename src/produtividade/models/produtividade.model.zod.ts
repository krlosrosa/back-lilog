import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Processo, TipoProcesso } from '../enums/produtividade.enums';
import { Turno } from '../enums/produtividade.enums';

export const inputProdutividadeModelZodSchema = z.object({
  centerId: z.string(),
  paginacao: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
    })
    .optional(),
});

export const InputProdutividadeModelZodDto = createZodDto(
  inputProdutividadeModelZodSchema,
);

@ObjectType()
export class ProdutividadeModel {
  @Field(() => Number)
  idDemanda: number;

  @Field(() => String)
  empresa: string;

  @Field(() => String)
  centerId: string;

  @Field(() => String)
  processo: TipoProcesso;

  @Field(() => String)
  segmento: string;

  @Field(() => String)
  inicio: string;

  @Field(() => String, { nullable: true })
  fim: string | null;

  @Field(() => String)
  cadastradoPorId: string;

  @Field(() => String)
  turno: Turno;

  @Field(() => String)
  funcionarioId: string;

  @Field(() => String)
  nomeFuncionario: string;

  @Field(() => String)
  statusDemanda: string;

  @Field(() => Number)
  caixas: number;

  @Field(() => Number)
  unidades: number;

  @Field(() => Number)
  paletes: number;

  @Field(() => Number)
  visitas: number;

  @Field(() => Number)
  pausas: number;

  @Field(() => Number)
  tempoTrabalhado: number;

  @Field(() => Number)
  tempoPausas: number;

  @Field(() => Number)
  tempoTotal: number;

  @Field(() => Number)
  produtividade: number;
}

@InputType()
export class PaginacaoGraph {
  @Field({ nullable: true })
  page?: string;

  @Field({ nullable: true })
  limit?: string;
}

@InputType()
export class InputProdutividadeModelGraph {
  @Field()
  centerId: string;

  @Field()
  data: string;

  @Field()
  processo: Processo;

  @Field()
  segmento: string;

  @Field({ nullable: true })
  pesquisa?: string;

  @Field({ nullable: true }) // status opcional
  status?: string;

  @Field({ nullable: true }) // empresa opcional
  empresa?: string;

  @Field(() => PaginacaoGraph, { nullable: true })
  paginacao?: PaginacaoGraph;
}
