import { Test, TestingModule } from '@nestjs/testing';
import { LivestreamsController } from './livestreams.controller';
import { LivestreamsService } from './livestreams.service';

describe('LivestreamsController', () => {
  let controller: LivestreamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestreamsController],
      providers: [LivestreamsService],
    }).compile();

    controller = module.get<LivestreamsController>(LivestreamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
