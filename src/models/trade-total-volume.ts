import { QuotedDiff } from './quoted-diff';

export interface Volume {
  quoted: number;
  base: number;
}

export interface TradeTotalVolumeInfo {
  orders: Volume & QuotedDiff;
  fees: Volume;
}

export interface TotalVolumeInfo {
  loss: QuotedDiff;
  profit: QuotedDiff;
  /** The ratio of maximum profit to maximum loss */
  riskRatio: number;
  entries: TradeTotalVolumeInfo;
  stops: TradeTotalVolumeInfo;
  takes: TradeTotalVolumeInfo;
}