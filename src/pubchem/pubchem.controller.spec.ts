import { Test, TestingModule } from '@nestjs/testing';
import { PubchemController } from './pubchem.controller';

describe('PubchemController', () => {
  let controller: PubchemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubchemController],
    }).compile();

    controller = module.get<PubchemController>(PubchemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
