type TInformation = {
  CID: number;
  Synonym: string[];
};

type TInformationList = {
  Information: TInformation[];
};

export type TSynonymData = {
  InformationList: TInformationList;
};
