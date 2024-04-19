import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getResponse } from './locals.util';
import { Compound } from './entity/compound.entity';

@Injectable()
export class LocalsService {
  private readonly path: string =
    'https://charming-plum-handbag.cyclic.app/compounds';
  async getCompounds() {
    const data = await getResponse(this.path);
    const compounds: Compound[] = await data.json();
    return compounds;
  }

  async getCompound(key: string) {
    const id = parseInt(key);
    if (isNaN(id))
      throw new BadRequestException('compounds/{id} should be number');
    const compounds = await this.getCompounds();
    const compound = compounds.find((comp) => comp.pk == id);
    if (!compound)
      throw new NotFoundException("Couldn't find compound with given id");
    return compound;
  }
}
