import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Get,
  Patch,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ContratosService } from './contratos.service';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post('upload/:locacaoId')
  @UseInterceptors(
    FileInterceptor('arquivo', {
      storage: diskStorage({
        destination: './uploads/contratos',
        filename: (req, file, cb) => {
          const nomeArquivo = `contrato-${Date.now()}${extname(file.originalname)}`;
          cb(null, nomeArquivo);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.toLowerCase().endsWith('.pdf')) {
          return cb(
            new BadRequestException('Apenas arquivos PDF são permitidos!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async upload(
    @Param('locacaoId', ParseIntPipe) locacaoId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Verifica se já existe contrato assinado
    const contratoExistente =
      await this.contratosService.buscarPorLocacao(locacaoId);

    if (contratoExistente?.assinado) {
      // Remove o arquivo salvo, pois será rejeitado
      fs.unlinkSync(file.path);
      throw new BadRequestException(
        'Não é permitido substituir um contrato já assinado.',
      );
    }

    // Se já existir contrato não assinado, substitui
    if (contratoExistente) {
      fs.unlinkSync(contratoExistente.caminhoArquivo); // Remove antigo
      return this.contratosService.atualizarArquivo(
        contratoExistente.id,
        file.path,
      );
    }

    // Senão, cria novo
    return this.contratosService.upload(locacaoId, file.path);
  }

  @Patch(':id/assinar')
  marcarComoAssinado(@Param('id', ParseIntPipe) id: number) {
    return this.contratosService.marcarComoAssinado(id);
  }

  @Get(':id/download')
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const contrato = await this.contratosService.download(id);
    const stream = fs.createReadStream(contrato.caminhoArquivo);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="contrato-${id}.pdf"`,
    });
    stream.pipe(res);
  }

  @Get()
  listar() {
    return this.contratosService.listarTodos();
  }
}
