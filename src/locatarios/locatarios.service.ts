// src/locatarios/locatarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locatario } from './locatario.entity';

@Injectable()
export class LocatariosService {
  constructor(
    @InjectRepository(Locatario)
    private locatarioRepo: Repository<Locatario>,
  ) {}

  create(data: Partial<Locatario>) {
    const novo = this.locatarioRepo.create(data);
    return this.locatarioRepo.save(novo);
  }

  findAll() {
    return this.locatarioRepo.find();
  }

  findOne(id: number) {
    return this.locatarioRepo.findOne({ where: { id } });
  }
}
