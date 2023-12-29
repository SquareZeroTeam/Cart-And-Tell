import { Test, TestingModule } from '@nestjs/testing';
import { OcbcController } from './ocbc.controller';
import { OcbcService } from './ocbc.service';

describe('OcbcController', () => {
  let controller: OcbcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcbcController],
      providers: [OcbcService],
    }).compile();

    controller = module.get<OcbcController>(OcbcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
