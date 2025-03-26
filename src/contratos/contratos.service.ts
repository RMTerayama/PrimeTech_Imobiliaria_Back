import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato } from './contrato.entity';
import { Repository } from 'typeorm';
import { Locacao } from '../locacoes/locacao.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private contratoRepo: Repository<Contrato>,
    @InjectRepository(Locacao)
    private locacaoRepo: Repository<Locacao>,
  ) {}

  async upload(locacaoId: number, caminhoArquivo: string) {
    const locacao = await this.locacaoRepo.findOne({
      where: { id: locacaoId },
    });
    if (!locacao) throw new NotFoundException('Locação não encontrada');

    const contrato = this.contratoRepo.create({ locacao, caminhoArquivo });
    return this.contratoRepo.save(contrato);
  }

  async atualizarArquivo(id: number, novoCaminho: string) {
    const contrato = await this.contratoRepo.findOne({ where: { id } });
    if (!contrato) throw new NotFoundException('Contrato não encontrado');

    contrato.caminhoArquivo = novoCaminho;
    return this.contratoRepo.save(contrato);
  }

  async buscarPorLocacao(locacaoId: number): Promise<Contrato | null> {
    return this.contratoRepo.findOne({ where: { locacao: { id: locacaoId } } });
  }

  async marcarComoAssinado(id: number) {
    const contrato = await this.contratoRepo.findOne({ where: { id } });
    if (!contrato) throw new NotFoundException('Contrato não encontrado');

    contrato.assinado = true;
    return this.contratoRepo.save(contrato);
  }

  async download(id: number) {
    const contrato = await this.contratoRepo.findOne({ where: { id } });
    if (!contrato) throw new NotFoundException('Contrato não encontrado');

    return contrato;
  }

  async listarTodos() {
    return this.contratoRepo.find({ relations: ['locacao'] });
  }
}
