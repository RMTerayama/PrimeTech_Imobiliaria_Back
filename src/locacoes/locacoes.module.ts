// src/locacoes/locacoes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocacoesService } from './locacoes.service';
import { LocacoesController } from './locacoes.controller';
import { Imovel } from '../imoveis/imovel.entity';
import { Locatario } from '../locatarios/locatario.entity';
import { Locacao } from './locacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imovel, Locatario, Locacao])],
  providers: [LocacoesService],
  controllers: [LocacoesController],
})
export class LocacoesModule {}
