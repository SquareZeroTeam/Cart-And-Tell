import { Test, TestingModule } from '@nestjs/testing';
import { MerchantBankDetailsController } from './merchant-bank-details.controller';
import { MerchantBankDetailsService } from './merchant-bank-details.service';

describe('MerchantBankDetailsController', () => {
  let controller: MerchantBankDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantBankDetailsController],
      providers: [MerchantBankDetailsService],
    }).compile();

    controller = module.get<MerchantBankDetailsController>(MerchantBankDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
