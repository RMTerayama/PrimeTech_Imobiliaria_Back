import { Module } from '@nestjs/common';
import { LocatariosService } from './locatarios.service';
import { LocatariosController } from './locatarios.controller';
import { Locatario } from './locatario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // Exemplo: src/imoveis/imoveis.module.ts
  imports: [TypeOrmModule.forFeature([Locatario])],
  providers: [LocatariosService],
  controllers: [LocatariosController],
})
export class LocatariosModule {}
