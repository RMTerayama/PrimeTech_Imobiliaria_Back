// src/imoveis/imoveis.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { Imovel } from './imovel.entity';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly service: ImoveisService) {}

  @Post()
  create(@Body() data: Partial<Imovel>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // src/imoveis/imoveis.controller.ts

  @Get('disponiveis')
  findDisponiveis() {
    return this.service.findDisponiveis();
  }

  @Get('alugados')
  findAlugados() {
    return this.service.findAlugados();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }
}
