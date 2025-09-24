import { CreateTesteInput } from './create-teste.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTesteInput extends PartialType(CreateTesteInput) {
  @Field(() => Int)
  id: number;
}
