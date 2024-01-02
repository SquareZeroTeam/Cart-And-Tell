import { Test, TestingModule } from '@nestjs/testing';
import { OcbcbankDetailsService } from './ocbcbank-details.service';

describe('OcbcbankDetailsService', () => {
  let service: OcbcbankDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcbcbankDetailsService],
    }).compile();

    service = module.get<OcbcbankDetailsService>(OcbcbankDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
