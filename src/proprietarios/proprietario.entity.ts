// src/proprietarios/proprietario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Imovel } from '../imoveis/imovel.entity';

@Entity('proprietarios')
export class Proprietario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  documentos: string;

  @Column()
  endereco: string;

  // Um proprietário pode ter vários imóveis
  @OneToMany(() => Imovel, (imovel) => imovel.proprietario)
  imoveis: Imovel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
