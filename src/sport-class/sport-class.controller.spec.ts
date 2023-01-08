import { Test, TestingModule } from '@nestjs/testing';
import { SportClassController } from './sport-class.controller';

describe('SportClassController', () => {
  let controller: SportClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportClassController],
    }).compile();

    controller = module.get<SportClassController>(SportClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
