// src/locacoes/locacao.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Imovel } from '../imoveis/imovel.entity';
import { Locatario } from '../locatarios/locatario.entity';

@Entity('locacoes')
export class Locacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Imovel, { eager: true })
  imovel: Imovel;

  @ManyToOne(() => Locatario, { eager: true })
  locatario: Locatario;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date', nullable: true })
  dataFim: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorMensal: number;

  @Column({
    type: 'enum',
    enum: ['ativa', 'encerrada', 'cancelada'],
    default: 'ativa',
  })
  status: 'ativa' | 'encerrada' | 'cancelada';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
