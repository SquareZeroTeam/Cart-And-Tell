import { Test, TestingModule } from '@nestjs/testing';
import { OcbcbankDetailsController } from './ocbcbank-details.controller';
import { OcbcbankDetailsService } from './ocbcbank-details.service';

describe('OcbcbankDetailsController', () => {
  let controller: OcbcbankDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcbcbankDetailsController],
      providers: [OcbcbankDetailsService],
    }).compile();

    controller = module.get<OcbcbankDetailsController>(OcbcbankDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
