import { AllOrderGroups, FlattenOrdersGroups } from './order-groups';
import { TradeOrder, TradeOrderArg } from './trade-order';
import { TotalVolumeInfo } from './trade-total-volume';

export interface OrdersInfoArg<T = TradeOrderArg> extends AllOrderGroups<T> {
  /** Whole Deposit */
  deposit: number;
  totalTradeVolumeQuoted: number;
  flattenOrderGroups: FlattenOrdersGroups;
}

export interface OrdersInfo extends AllOrderGroups<TradeOrder> {
  totalVolume: TotalVolumeInfo;
}