// src/locatarios/locatarios.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { LocatariosService } from './locatarios.service';
import { Locatario } from './locatario.entity';

@Controller('locatarios')
export class LocatariosController {
  constructor(private readonly service: LocatariosService) {}

  @Post()
  create(@Body() data: Partial<Locatario>) {
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
