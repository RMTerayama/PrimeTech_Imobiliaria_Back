// src/locacoes/locacoes.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { LocacoesService } from './locacoes.service';
import { AlugarDto } from './dto/alugar.dto';

@Controller('locacoes')
export class LocacoesController {
  constructor(private readonly locacoesService: LocacoesService) {}

  // Endpoint para alugar imóvel
  @Post('alugar')
  alugar(@Body() body: AlugarDto) {
    return this.locacoesService.alugarImovel(body);
  }

  // ✅ Endpoint para encerrar locação
  @Patch(':id/encerrar')
  encerrar(@Param('id', ParseIntPipe) id: number) {
    return this.locacoesService.encerrarLocacao(id);
  }

  @Get()
  listarTodas() {
    return this.locacoesService.listarTodas();
  }

  @Get('imovel/:id')
  listarPorImovel(@Param('id', ParseIntPipe) id: number) {
    return this.locacoesService.listarPorImovel(id);
  }

  @Get('locatario/:id')
  listarPorLocatario(@Param('id', ParseIntPipe) id: number) {
    return this.locacoesService.listarPorLocatario(id);
  }
}
