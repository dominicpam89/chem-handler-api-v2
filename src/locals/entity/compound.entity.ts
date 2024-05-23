export class JSONBinCompound {
  record: {
    compounds: Compound[];
  };
}

export class Compound {
  pk: number;
  trivial_name: string;
  cas_number: string;
  inci_name: string;
  smiles: string;
  comedogenicity_class: number;
  structure: string;
}
