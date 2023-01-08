import { Test, TestingModule } from '@nestjs/testing';
import { SportClassService } from './sport-class.service';

describe('SportClassService', () => {
  let service: SportClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportClassService],
    }).compile();

    service = module.get<SportClassService>(SportClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
