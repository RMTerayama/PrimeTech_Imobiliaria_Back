import { Test, TestingModule } from '@nestjs/testing';
import { ProprietariosService } from './proprietarios.service';

describe('ProprietariosService', () => {
  let service: ProprietariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProprietariosService],
    }).compile();

    service = module.get<ProprietariosService>(ProprietariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
