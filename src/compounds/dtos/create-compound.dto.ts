import { IsNumber, IsString, IsOptional, Max, Min } from 'class-validator';

export class CreateCompoundDto {
  @IsNumber()
  pk: number;

  @IsString()
  trivial_name: string;

  @IsString()
  cas_number: string;

  @IsString()
  inci_name: string;

  @IsString()
  smiles: string;

  @IsOptional()
  @IsNumber()
  @Max(2)
  @Min(0)
  comedogenicity_class?: number;
}
