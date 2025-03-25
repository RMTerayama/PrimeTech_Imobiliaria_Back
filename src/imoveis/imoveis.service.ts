// src/imoveis/imoveis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imovel } from './imovel.entity';
import { Locacao } from 'src/locacoes/locacao.entity';

@Injectable()
export class ImoveisService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepo: Repository<Imovel>,

    @InjectRepository(Locacao)
    private locacaoRepo: Repository<Locacao>,
  ) {}

  create(data: Partial<Imovel>) {
    const novo = this.imovelRepo.create(data);
    return this.imovelRepo.save(novo);
  }

  findAll() {
    return this.imovelRepo.find();
  }

  async findOne(id: number) {
    const imovel = await this.imovelRepo.findOne({
      where: { id },
      relations: ['proprietario'],
    });

    if (!imovel) {
      throw new NotFoundException('Imóvel não encontrado');
    }

    const locacaoAtiva = await this.locacaoRepo.findOne({
      where: {
        imovel: { id },
        status: 'ativa',
      },
      relations: ['locatario'],
    });

    return {
      ...imovel,
      locatarioAtual: locacaoAtiva?.locatario ?? null,
    };
  }

  // src/imoveis/imoveis.service.ts

  // Listar imóveis com status "disponível"
  async findDisponiveis() {
    return this.imovelRepo.find({
      where: { status: 'disponivel' },
      relations: ['proprietario'],
    });
  }

  // Listar imóveis que estão alugados (tem locação ativa)
  async findAlugados() {
    const locacoesAtivas = await this.locacaoRepo.find({
      where: { status: 'ativa' },
      relations: ['imovel', 'imovel.proprietario'],
    });

    // Retornar apenas os imóveis únicos com locação ativa
    return locacoesAtivas.map((locacao) => ({
      ...locacao.imovel,
      locatarioAtual: locacao.locatario,
    }));
  }
}
