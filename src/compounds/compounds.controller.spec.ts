import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsController } from './compounds.controller';

describe('CompoundsController', () => {
  let controller: CompoundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompoundsController],
    }).compile();

    controller = module.get<CompoundsController>(CompoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
