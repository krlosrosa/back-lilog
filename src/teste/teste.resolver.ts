import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TesteService } from './teste.service';
import { Teste } from './entities/teste.entity';
import { CreateTesteInput } from './dto/create-teste.input';
import { UpdateTesteInput } from './dto/update-teste.input';

@Resolver(() => Teste)
export class TesteResolver {
  constructor(private readonly testeService: TesteService) {}

  @Mutation(() => Teste)
  createTeste(@Args('createTesteInput') createTesteInput: CreateTesteInput) {
    return this.testeService.create(createTesteInput);
  }

  @Query(() => [Teste], { name: 'teste' })
  findAll() {
    return this.testeService.findAll();
  }

  @Query(() => Teste, { name: 'teste' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testeService.findOne(id);
  }

  @Mutation(() => Teste)
  updateTeste(@Args('updateTesteInput') updateTesteInput: UpdateTesteInput) {
    return this.testeService.update(updateTesteInput.id, updateTesteInput);
  }

  @Mutation(() => Teste)
  removeTeste(@Args('id', { type: () => Int }) id: number) {
    return this.testeService.remove(id);
  }
}
