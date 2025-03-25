// src/proprietarios/proprietarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proprietario } from './proprietario.entity';

@Injectable()
export class ProprietariosService {
  constructor(
    @InjectRepository(Proprietario)
    private proprietarioRepo: Repository<Proprietario>,
  ) {}

  create(data: Partial<Proprietario>) {
    const novo = this.proprietarioRepo.create(data);
    return this.proprietarioRepo.save(novo);
  }

  findAll() {
    return this.proprietarioRepo.find();
  }

  findOne(id: number) {
    return this.proprietarioRepo.findOne({ where: { id } });
  }
}
