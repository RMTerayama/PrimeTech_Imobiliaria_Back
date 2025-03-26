import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './contrato.entity';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { Locacao } from '../locacoes/locacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, Locacao])],
  controllers: [ContratosController],
  providers: [ContratosService],
})
export class ContratosModule {}
