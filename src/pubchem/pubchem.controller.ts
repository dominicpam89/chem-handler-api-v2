import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { Response as ERes } from 'express';
import { UsePubchemAPI } from './decorators/api-base.decorator';
import { CIDDto } from './dtos/cid.dto';
import { PubchemResponseInterceptor } from './interceptors/pubchem-response.interceptor';
import { NameDto } from './dtos/name.dto';
import { TGetBy } from './types/getby.type';
import { TypeOperation } from './types/operation.type';
import { SmilesDto } from './dtos/smiles.dto';

@Controller('pubchem')
export class PubchemController {
  constructor(private pubchemService: PubchemService) {}

  @UseInterceptors(PubchemResponseInterceptor)
  @Post('/cid')
  async getByCid(@Body() body: CIDDto, @UsePubchemAPI() apiURI: string) {
    const { id, operationType, propertyName } = body;
    // creating url based on BODY
    const url = this.urlMaker(apiURI, 'cid', id, operationType, propertyName);
    // get the response based on Body.operationType
    return this.pubchemService.getByJSON(url);
  }

  @UseInterceptors(PubchemResponseInterceptor)
  @Post('/name')
  async getByName(@Body() body: NameDto, @UsePubchemAPI() apiURI: string) {
    const { name, operationType, propertyName } = body;
    // creating url based on BODY
    const url = this.urlMaker(
      apiURI,
      'name',
      name,
      operationType,
      propertyName,
    );
    // get the response based on Body.operationType
    return this.pubchemService.getByJSON(url);
  }

  @UseInterceptors(PubchemResponseInterceptor)
  @Post('/smiles')
  async getBySmiles(@Body() body: SmilesDto, @UsePubchemAPI() apiURI: string) {
    const { smiles, operationType, propertyName } = body;
    // creating url based on BODY
    const url = this.urlMaker(
      apiURI,
      'smiles',
      smiles,
      operationType,
      propertyName,
    );
    // get the response based on Body.operationType
    return this.pubchemService.getByJSON(url);
  }

  // get image data from pubchem by CID
  @Get('/cid/:id/image')
  async getByCidImage(
    @Param('id') cid: string,
    @UsePubchemAPI() apiURI: string,
    @Res() response: ERes,
  ) {
    const url = apiURI + 'cid/' + cid + '/PNG';
    const imageBuffer = await this.pubchemService.getByImage(url);
    response.setHeader('Content-Type', 'image/png');
    response.send(Buffer.from(imageBuffer));
  }

  // get image data from pubchem by Compound's Name
  @Get('/name/:cname/image')
  async getByNameImage(
    @Param('cname') cname: string,
    @UsePubchemAPI() apiURI: string,
    @Res() response: ERes,
  ) {
    const url = apiURI + 'name/' + cname + '/PNG';
    const imageBuffer = await this.pubchemService.getByImage(url);
    response.setHeader('Content-Type', 'image/png');
    response.send(Buffer.from(imageBuffer));
  }

  // get image data from pubchem by Compound's Smiles
  @Get('/smiles/:smiles/image')
  async getBySmilesImage(
    @Param('smiles') smiles: string,
    @UsePubchemAPI() apiURI: string,
    @Res() response: ERes,
  ) {
    const url = apiURI + 'smiles/' + smiles + '/PNG';
    const imageBuffer = await this.pubchemService.getByImage(url);
    response.setHeader('Content-Type', 'image/png');
    response.send(Buffer.from(imageBuffer));
  }

  // url maker
  urlMaker(
    apiURI: string, // base pubchem API url, coming from PubchemApiMiddleware
    by: TGetBy, // by cid, by name, etc.
    byValue: string | number, // value of cid, value of name accordingly
    operationType: TypeOperation, // filter by operation: fullRecords, property, image, synonyms
    propertyName?: string | undefined, // the value of properties's array: "MolecularWeight, InChl"
  ) {
    let url: string;
    // full records assignment
    if (by === 'cid') url = apiURI + 'cid/' + byValue;
    else if (by === 'name') url = apiURI + 'name/' + byValue;
    else if (by === 'smiles') url = apiURI + 'smiles/' + byValue;
    switch (operationType) {
      case 'fullRecords':
        url += '/JSON';
        break;
      case 'property':
        url += '/property/' + propertyName + '/JSON';
        break;
      case 'synonyms':
        url += '/synonyms/JSON';
        break;
      default:
        throw new BadRequestException('operationType is undefined!');
    }
    return url;
  }
}
