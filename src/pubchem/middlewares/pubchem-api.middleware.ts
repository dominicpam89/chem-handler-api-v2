import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export interface PubchemAPIRequest extends Request {
  pubchemAPIUrl?: string;
}

@Injectable()
export class PubchemApiMiddleware implements NestMiddleware {
  use(req: PubchemAPIRequest, res: Response, next: (error?: any) => void) {
    const url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/';
    req.pubchemAPIUrl = url;
    res;
    next();
  }
}
