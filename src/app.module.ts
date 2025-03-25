// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { LocatariosModule } from './locatarios/locatarios.module';
import { ImoveisModule } from './imoveis/imoveis.module';
import { LocacoesModule } from './locacoes/locacoes.module';

@Module({
  imports: [
    // ConfigModule carrega o .env na raiz do projeto (process.cwd())
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
    }),
    // Configuração assíncrona do TypeOrmModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Apenas em ambiente de desenvolvimento!
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProprietariosModule,
    LocatariosModule,
    ImoveisModule,
    LocacoesModule,
  ],
})
export class AppModule {}
