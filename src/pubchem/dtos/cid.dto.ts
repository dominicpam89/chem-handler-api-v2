import { TypeOperation, OperationConst } from './../types/operation.type';
/* 
 "id": 1,
 "operationType": "property",
 "propertyName": "MolecularWeight"
*/

import { ValidateIf, IsString, IsNumber, IsIn } from 'class-validator';

export class CIDDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsIn([...OperationConst])
  operationType: TypeOperation;

  @ValidateIf((object) => object.operationType === 'property')
  @IsString()
  propertyName?: string;
}
