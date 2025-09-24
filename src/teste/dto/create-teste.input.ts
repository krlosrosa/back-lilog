import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTesteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
