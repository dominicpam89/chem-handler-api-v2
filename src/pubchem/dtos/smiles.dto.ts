import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { OperationConst, TypeOperation } from '../types/operation.type';

export class SmilesDto {
  @IsString()
  smiles: string;

  @IsOptional()
  @IsIn([...OperationConst])
  @IsString()
  operationType?: TypeOperation;

  @ValidateIf((object) => object.operationType === 'property')
  @IsString()
  propertyName?: string;
}
