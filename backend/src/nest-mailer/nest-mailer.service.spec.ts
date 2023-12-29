import { Test, TestingModule } from '@nestjs/testing';
import { NestMailerService } from './nest-mailer.service';

describe('NestMailerService', () => {
  let service: NestMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestMailerService],
    }).compile();

    service = module.get<NestMailerService>(NestMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
