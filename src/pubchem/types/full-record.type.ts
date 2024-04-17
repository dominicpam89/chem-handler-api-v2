type CompoundId = {
  id: {
    cid: number;
  };
};

type CompoundAtoms = {
  aid: number[];
  element: number[];
  [key: string]: any;
};

type CompoundBonds = {
  aid1: number[];
  aid2: number[];
  order: number[];
  [key: string]: any;
};

type CompoundStereoTetrahedral = {
  center: number;
  above: number;
  top: number;
  bottom: number;
  below: number;
  parity: number;
  type: number;
  [key: string]: any;
};

type CompoundCoords = {
  type: number[];
  aid: number[];
  conformers: {
    x: number[];
    y: number[];
    style: {
      annotation: number[];
      aid1: number[];
      aid2: number[];
      [key: string]: any;
    };
    [key: string]: any;
  }[];
  [key: string]: any;
};

type CompoundProps = {
  urn: {
    label: string;
    name?: string;
    datatype: number;
    release: string;
    implementation?: string;
    version?: string;
    software?: string;
    source?: string;
    parameters?: string;
    [key: string]: any;
  };
  value: {
    ival?: number;
    fval?: number;
    sval?: string;
    binary?: string;
    [key: string]: any;
  };
};

type CompoundCount = {
  heavy_atom: number;
  atom_chiral: number;
  atom_chiral_def: number;
  atom_chiral_undef: number;
  bond_chiral: number;
  bond_chiral_def: number;
  bond_chiral_undef: number;
  isotope_atom: number;
  covalent_unit: number;
  tautomers: number;
};

export class Compound {
  id: CompoundId;
  atoms: CompoundAtoms;
  bonds: CompoundBonds;
  stereo: CompoundStereoTetrahedral[];
  coords: CompoundCoords[];
  charge: number;
  props: CompoundProps[];
  count: CompoundCount;
  [key: string]: any;
}

export type TFullRecordsData = {
  PC_Compounds: Compound[];
};
