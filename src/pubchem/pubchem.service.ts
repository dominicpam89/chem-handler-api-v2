import { Injectable } from '@nestjs/common';
import { getResponse } from './pubchem.util';

@Injectable()
export class PubchemService {
  async getByJSON(url: string) {
    const response = await getResponse(url);
    const data = await response.json();
    return data;
  }

  async getByImage(url: string) {
    const response = await getResponse(url);
    const imageBuffer = await response.arrayBuffer();
    return imageBuffer;
  }
}
