// src/imoveis/imovel.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Proprietario } from '../proprietarios/proprietario.entity';
import { Locatario } from '../locatarios/locatario.entity';

@Entity('imoveis')
export class Imovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ type: 'enum', enum: ['venda', 'aluguel'] })
  tipoNegocio: 'venda' | 'aluguel';

  @Column({ type: 'enum', enum: ['disponivel', 'indisponivel'] })
  status: 'disponivel' | 'indisponivel';

  @Column('simple-array', { nullable: true })
  imagens: string[]; // Lista de caminhos de imagem

  // Relacionamento com o proprietário
  @ManyToOne(() => Proprietario, (proprietario) => proprietario.imoveis, {
    eager: true,
  })
  proprietario: Proprietario;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
