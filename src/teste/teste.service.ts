import { Injectable } from '@nestjs/common';
import { CreateTesteInput } from './dto/create-teste.input';
import { UpdateTesteInput } from './dto/update-teste.input';

@Injectable()
export class TesteService {
  create(createTesteInput: CreateTesteInput) {
    return 'This action adds a new teste';
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTesteInput: UpdateTesteInput) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
