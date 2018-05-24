export enum FieldType {
  ID, STRING
}

export interface Field {
  key: string;
  name: string;
  type: FieldType;
}

export interface Type {
  key: string;
  name: string;
  fields: Field[];
}
