import { IsString, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateCompoundDto {
  @IsOptional()
  @IsString()
  trivial_name?: string;

  @IsOptional()
  @IsString()
  cas_number?: string;

  @IsOptional()
  @IsString()
  inci_name?: string;

  @IsOptional()
  @IsString()
  smiles?: string;

  @IsOptional()
  @IsNumber()
  @Max(2)
  @Min(0)
  comedogenicity_class?: number;
}
