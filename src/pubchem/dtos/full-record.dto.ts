interface AnyObject {
  [key: string]: any;
}

export const findValueByKey = (
  obj: AnyObject,
  key: string,
): any | undefined => {
  if (typeof obj !== 'object' || obj === null) return undefined;
  if (key in obj) return obj[key];
  for (const prop in obj) {
    const value = findValueByKey(obj[prop], key);
    if (value !== undefined) return value;
  }
  return undefined;
};

import { Expose } from 'class-transformer';
export class FullRecordsDto {
  @Expose()
  pk: number;

  @Expose()
  smiles: string;
}
