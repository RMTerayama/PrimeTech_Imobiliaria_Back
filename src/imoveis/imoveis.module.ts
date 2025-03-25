import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imovel } from './imovel.entity';
import { ImoveisService } from './imoveis.service';
import { ImoveisController } from './imoveis.controller';
import { Proprietario } from '../proprietarios/proprietario.entity';
import { Locacao } from '../locacoes/locacao.entity'; // ✅ Aqui está o segredo!

@Module({
  imports: [TypeOrmModule.forFeature([Imovel, Proprietario, Locacao])], // ✅ Adicione Locacao aqui
  providers: [ImoveisService],
  controllers: [ImoveisController],
})
export class ImoveisModule {}
