type TProperties = {
  CID: number;
  [key: string]: any;
};

type TPropertiesTable = {
  Properties: TProperties[];
};

export type TPropertyData = {
  PropertyTable: TPropertiesTable;
};
