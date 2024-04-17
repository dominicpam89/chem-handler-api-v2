import { Test, TestingModule } from '@nestjs/testing';
import { PubchemService } from './pubchem.service';

describe('PubchemService', () => {
  let service: PubchemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubchemService],
    }).compile();

    service = module.get<PubchemService>(PubchemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
