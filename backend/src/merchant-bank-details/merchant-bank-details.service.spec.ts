import { Test, TestingModule } from '@nestjs/testing';
import { MerchantBankDetailsService } from './merchant-bank-details.service';

describe('MerchantBankDetailsService', () => {
  let service: MerchantBankDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantBankDetailsService],
    }).compile();

    service = module.get<MerchantBankDetailsService>(MerchantBankDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
