import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getResponse } from './locals.util';
import { JSONBinCompound } from './entity/compound.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalsService {
  private readonly path: string =
    'https://api.jsonbin.io/v3/b/664f5dd0ad19ca34f86dfacd';
  constructor(private configService: ConfigService) {}
  async getCompounds() {
    const keys = {
      master: this.configService.get('JSONBIN-IO-MASTER-KEY'),
      access: this.configService.get('JSONBIN-IO-ACCESS-KEY'),
    };
    const data = await getResponse(this.path, keys);
    const record: JSONBinCompound = await data.json();
    const { compounds } = record.record;
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
