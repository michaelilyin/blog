export enum ViewType {
  ID, STRING
}

export interface GridColumnView {
  key: string;
  name: string;
  displayed: boolean;
  type: ViewType;
}
