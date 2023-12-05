import { Test, TestingModule } from '@nestjs/testing';
import { MerchantProductsController } from './merchant-products.controller';
import { MerchantProductsService } from './merchant-products.service';

describe('MerchantProductsController', () => {
  let controller: MerchantProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantProductsController],
      providers: [MerchantProductsService],
    }).compile();

    controller = module.get<MerchantProductsController>(MerchantProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
