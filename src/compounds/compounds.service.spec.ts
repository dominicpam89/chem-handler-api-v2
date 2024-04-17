import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsService } from './compounds.service';
import { Repository } from 'typeorm';
import { Compound } from './compounds.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCompoundDto } from './dtos/create-compound.dto';

const MOCK_COMPOUNDS = [
  {
    pk: 1,
    trivial_name: 'trivial_name_001',
    cas_number: '101',
    inci_name: 'inci_name_001',
    smiles: 'smiles_001',
    comedogenicity_class: 1,
  },
  {
    pk: 2,
    trivial_name: 'trivial_name_002',
    cas_number: '101, 102, 103',
    inci_name: 'inci_name_002',
    smiles: 'smiles_002',
    comedogenicity_class: 2,
  },
];

const MOCK_COMPOUND: Compound = {
  pk: 3,
  trivial_name: 'trivial_name_003',
  cas_number: '103',
  inci_name: 'inci_name_003',
  smiles: 'smiles_003',
  comedogenicity_class: 3,
};

class RepositoryMock<T> {
  // Mocking find method
  find = jest.fn().mockResolvedValue(MOCK_COMPOUNDS);
  // Mocking findOneBy method
  findOneBy = jest.fn().mockResolvedValue(MOCK_COMPOUNDS[0]);
  // Mocking create method
  create = jest.fn();
  // Mocking save method
  save = jest.fn().mockResolvedValue(MOCK_COMPOUND);
  // Mocking remove method
  remove = jest.fn().mockResolvedValue(MOCK_COMPOUND);
}

describe('CompoundsService', () => {
  let service: CompoundsService;
  let repo: Repository<Compound>;
  let mockCompounds = MOCK_COMPOUNDS;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompoundsService,
        { provide: getRepositoryToken(Compound), useClass: RepositoryMock },
      ],
    }).compile();

    service = module.get<CompoundsService>(CompoundsService);
    repo = module.get<Repository<Compound>>(getRepositoryToken(Compound));
  });

  it('Get the result compounds', async () => {
    const compounds = await service.getCompounds();
    expect(compounds).toHaveLength(2);
    expect(compounds[0].pk).toEqual(mockCompounds[0].pk);
  });
  it('Get one result of service.getCompound(pk:string)', async () => {
    const compound = await service.getCompound('1');
    expect(compound.pk).toEqual(1);
  });
});
