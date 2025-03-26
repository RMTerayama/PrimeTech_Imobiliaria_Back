// src/locacoes/locacoes.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from '../imoveis/imovel.entity';
import { Locatario } from '../locatarios/locatario.entity';
import { Repository } from 'typeorm';
import { AlugarDto } from './dto/alugar.dto';
import { Locacao } from './locacao.entity';

@Injectable()
export class LocacoesService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepo: Repository<Imovel>,

    @InjectRepository(Locatario)
    private locatarioRepo: Repository<Locatario>,

    @InjectRepository(Locacao)
    private locacaoRepo: Repository<Locacao>,
  ) {}

  async alugarImovel(dto: AlugarDto) {
    const imovel = await this.imovelRepo.findOne({
      where: { id: dto.imovelId },
    });
    const locatario = await this.locatarioRepo.findOne({
      where: { id: dto.locatarioId },
    });

    if (!imovel || !locatario) {
      throw new NotFoundException('Imóvel ou locatário não encontrado');
    }

    const locacaoAtiva = await this.locacaoRepo.findOne({
      where: { imovel: { id: dto.imovelId }, status: 'ativa' },
    });

    if (locacaoAtiva) {
      throw new BadRequestException('Este imóvel já está alugado atualmente');
    }

    const locacao = this.locacaoRepo.create({
      imovel,
      locatario,
      dataInicio: dto.dataInicio,
      valorMensal: dto.valorMensal,
      status: 'ativa',
    });

    await this.locacaoRepo.save(locacao);

    // Atualiza o status do imóvel para "indisponivel"
    imovel.status = 'indisponivel';
    await this.imovelRepo.save(imovel);

    return locacao;
  }

  async encerrarLocacao(locacaoId: number) {
    const locacao = await this.locacaoRepo.findOne({
      where: { id: locacaoId },
      relations: ['imovel'],
    });

    if (!locacao) {
      throw new NotFoundException('Locação não encontrada');
    }

    if (locacao.status !== 'ativa') {
      throw new BadRequestException(
        'Esta locação já foi encerrada ou cancelada',
      );
    }

    // Atualiza os dados
    locacao.status = 'encerrada';
    locacao.dataFim = new Date();
    await this.locacaoRepo.save(locacao);

    // Libera o imóvel
    locacao.imovel.status = 'disponivel';
    await this.imovelRepo.save(locacao.imovel);

    return { message: 'Locação encerrada com sucesso' };
  }

  async listarTodas() {
    return this.locacaoRepo.find({
      relations: ['imovel', 'locatario'],
      order: { createdAt: 'DESC' },
    });
  }

  async listarPorImovel(imovelId: number) {
    return this.locacaoRepo.find({
      where: { imovel: { id: imovelId } },
      relations: ['imovel', 'locatario'],
    });
  }

  async listarPorLocatario(locatarioId: number) {
    return this.locacaoRepo.find({
      where: { locatario: { id: locatarioId } },
      relations: ['imovel', 'locatario'],
    });
  }
}
