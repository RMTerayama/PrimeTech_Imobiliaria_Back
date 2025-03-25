import { Module } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { ProprietariosController } from './proprietarios.controller';
import { Proprietario } from './proprietario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // Exemplo: src/imoveis/imoveis.module.ts
  imports: [TypeOrmModule.forFeature([Proprietario])],
  providers: [ProprietariosService],
  controllers: [ProprietariosController],
})
export class ProprietariosModule {}
