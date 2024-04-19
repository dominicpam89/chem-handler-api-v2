import { Test, TestingModule } from '@nestjs/testing';
import { LocalsService } from './locals.service';
import { Compound } from './entity/compound.entity';
import { NotFoundException } from '@nestjs/common';

describe('LocalsService', () => {
  let service: LocalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalsService],
    }).compile();

    service = module.get<LocalsService>(LocalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('return type of Compound[]', async () => {
    const compounds = await service.getCompounds();
    expect(compounds).toBeDefined();
    expect(compounds.length > 0).toBeTruthy();
    expect(compounds.at(0)).toHaveProperty('pk');
    expect(compounds.at(0)).toHaveProperty('inci_name');
    expect(compounds.at(0)).toHaveProperty('smiles');
  });

  it('getCompound return type of Compound', async () => {
    const compound = await service.getCompound('1');
    expect(compound).toBeDefined();
    expect(compound).toHaveProperty('pk');
    expect(compound).toHaveProperty('inci_name');
    expect(compound).toHaveProperty('smiles');
  });

  it("thrown an error if given id that doesn't exist", async () => {
    try {
      const compound = await service.getCompound('0');
      expect(compound).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
