import { Test, TestingModule } from '@nestjs/testing';
import { MerchantProductsService } from './merchant-products.service';

describe('MerchantProductsService', () => {
  let service: MerchantProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantProductsService],
    }).compile();

    service = module.get<MerchantProductsService>(MerchantProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
