import { Test, TestingModule } from '@nestjs/testing';
import { OcbcService } from './ocbc.service';

describe('OcbcService', () => {
  let service: OcbcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcbcService],
    }).compile();

    service = module.get<OcbcService>(OcbcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
