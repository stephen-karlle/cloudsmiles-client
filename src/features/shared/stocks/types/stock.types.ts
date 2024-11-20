

export interface IStockStatus {
  status: string;
  value: number;
}

export interface IStockData {
  stocks: IStockStatus[];
  totalProducts: number;
  totalAssetValue: number;
}