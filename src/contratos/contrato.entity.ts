import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Locacao } from '../locacoes/locacao.entity';

@Entity('contratos')
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Locacao)
  @JoinColumn()
  locacao: Locacao;

  @Column()
  caminhoArquivo: string;

  @Column({ default: false })
  assinado: boolean;

  @CreateDateColumn()
  criadoEm: Date;
}
