import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compound } from './compounds.entity';
import { Repository } from 'typeorm';
import { CreateCompoundDto } from './dtos/create-compound.dto';

@Injectable()
export class CompoundsService {
  constructor(@InjectRepository(Compound) private repo: Repository<Compound>) {}

  getCompounds() {
    return this.repo.find();
  }

  getCompound(pk: string) {
    return this.repo.findOneBy({ pk: parseInt(pk) });
  }

  async getCompoundSearch(trivialName: string) {
    // first get all compounds
    const compounds = await this.getCompounds();

    // create regex based on search query "trivialName"
    const regex = new RegExp(trivialName, 'i');

    // filter compounds to only return compound.trivial_name === regex
    return compounds.filter((compound) => regex.test(compound.trivial_name));
  }

  createCompound(compound: CreateCompoundDto) {
    /**
     * create entity using "create" would have hooks
     * such as afterInsert, afterUpdate in Compounds entity
     */
    const newCompound = this.repo.create(compound);
    return this.repo.save(newCompound);
  }

  async deleteCompound(pk: string) {
    // first get compound by using existing function in this class "getCompound"
    const compound = await this.getCompound(pk);

    // throw 404 if no compound found
    if (!compound)
      throw new NotFoundException("Couldn't found given compound pk");

    // delete compound
    return this.repo.remove(compound);
  }

  async updateCompound(pk: string, body: Partial<Compound>) {
    // first get compound by using existing function in this class "getCompound"
    const compound = await this.getCompound(pk);

    // throw 404 if no compound found
    if (!compound)
      throw new NotFoundException("Couldn't found given compound pk");

    // assign update data from body to compound object
    Object.assign(compound, body);

    // save it in database
    return this.repo.save(compound);
  }
}
