import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TFullRecordsData } from './../types/full-record.type';
import { TPropertyData } from './../types/property.type';
import { TSynonymData } from './../types/synonym.type';
import { findValueByKey } from '../dtos/full-record.dto';

type TypeData = TFullRecordsData | TPropertyData | TSynonymData;
/** 
  the enum value, got from first key in each every TypeData
  the purpose is to get what kind of data coming from original response:
  can be FullRecordsData, TPropertyData, or TSynonymData
*/
enum EnumData {
  fullRecords = 'PC_Compounds',
  property = 'PropertyTable',
  synonym = 'InformationList',
}

export class PubchemResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    context;
    return next.handle().pipe(
      map((data: TypeData) => {
        let transformedData: any;
        switch (this.getDataType(data)) {
          // incase data type is full records
          case EnumData.fullRecords:
            transformedData = this.interceptFullRecords(
              data as TFullRecordsData,
            );
            break;
          // incase data type is based on propertiesTable operation
          case EnumData.property:
            transformedData = this.interceptProperties(data as TPropertyData);
            break;
          // incase data type is based on synonyms operation
          case EnumData.synonym:
            // temporary, need to update
            transformedData = this.interceptSynonyms(data as TSynonymData);
            break;
        }
        return transformedData;
      }),
    );
  }
  interceptFullRecords(data: TFullRecordsData) {
    const compoundData = data.PC_Compounds[0];
    const pk: number = findValueByKey(data, 'cid');
    const indexProp = compoundData.props.findIndex(
      (prop) => prop.urn.label === 'SMILES',
    );
    const smiles: string = compoundData.props[indexProp]?.value?.sval;
    return {
      pk,
      smiles,
    };
  }
  interceptProperties(data: TPropertyData) {
    const {
      PropertyTable: { Properties },
    } = data;
    const { CID, ...rest } = Properties[0];
    return {
      pk: CID,
      ...rest,
    };
  }
  interceptSynonyms(data: TSynonymData) {
    const {
      InformationList: { Information },
    } = data;
    const { CID, Synonym } = Information[0];
    return {
      pk: CID,
      synonyms: [...Synonym],
    };
  }
  getDataType(data: TypeData): string {
    if (Object.keys(data).includes(EnumData.fullRecords))
      return EnumData.fullRecords;
    if (Object.keys(data).includes(EnumData.property)) return EnumData.property;
    if (Object.keys(data).includes(EnumData.synonym)) return EnumData.synonym;
    else return String('Interceptor error, data is unknown!');
  }
}
