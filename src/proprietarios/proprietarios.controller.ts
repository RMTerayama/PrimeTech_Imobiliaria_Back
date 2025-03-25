// src/proprietarios/proprietarios.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { Proprietario } from './proprietario.entity';

@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly service: ProprietariosService) {}

  @Post()
  create(@Body() data: Partial<Proprietario>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }
}
