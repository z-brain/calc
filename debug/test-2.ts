import { expect } from 'chai';
import '../src/chai/index';

import { TradeInfoArgs } from '../src/models/trade-info';
import { ETradeType } from '../src/models/trade-type.enum';
import { zMath } from '../src/z-math';
import { zRisk } from '../src/z-risk';

const commonInfo = {
  tradeType: ETradeType.Short,
  deposit: 1000 * 1000/* * 1000*/,
  risk: .01, // 1%
  maxTradeVolumeQuoted: 100000,
  leverage: {
    allow: true,
    max: 3,
  },
  breakeven: { fee: .002 },
};

const args: TradeInfoArgs = {
  ...commonInfo,
  maxTradeVolumeQuoted: +Infinity,
  entries: [
    { price: 8000, volumePart: .25, fee: 0.001 },
    { price: 7500, volumePart: .25, fee: 0.002 },
    { price: 7000, volumePart: .5,  fee: 0.001 },
  ],
  stops:   [
    { price: 8100, volumePart: .5,  fee: 0.002 },
    { price: 8200, volumePart: .25, fee: 0.002 },
    { price: 15500, volumePart: .25, fee: 0.002 },
  ],
  takes:   [
    { price: 5000, volumePart: .25, fee: 0.002 },
    { price: 5250, volumePart: .1,  fee: 0.001 },
    { price: 5500, volumePart: .15, fee: 0.002 },
    { price: 5900, volumePart: .5,  fee: 0.001 },
  ],
};

const vRisk = args.deposit * args.risk; /* ? */
const vSumEntriesQ = vRisk / (
    zMath.sumBy(args.entries, v => v.volumePart / v.price)
  * zMath.sumBy(args.stops,   v => v.volumePart * v.price)
  + zMath.sumBy(args.entries, v => v.volumePart * v.fee) // entries fee
  + zMath.sumBy(args.stops,   v => v.volumePart * v.fee) // stops fee
  - 1
); /* ? */

const VeQ = args.entries.map(v => vSumEntriesQ * v.volumePart);
const VeB = args.entries.map((v, i) => VeQ[i] / v.price);
const vSumEntriesB = zMath.sum(VeB); /* ? */
const pAvgE = zRisk.avgPriceOfQuoted(args.entries); /* ? */
expect(vSumEntriesB * pAvgE).to.roundEq(vSumEntriesQ);

const VeFQ = args.entries.map((v, i) => v.fee * VeQ[i]); /* ? */
const entryFees = zMath.sum(VeFQ); /* ? */

// Stop Volume
const VsQ = args.stops.map(v => vSumEntriesQ * v.volumePart);
const VsB = args.stops.map((v, i) => VsQ[i] / v.price);
const vSumStopsQ = zMath.sum(VsQ); /* ? */
const vSumStopsB = zMath.sum(VsB); /* ? */
const pAvgS = zRisk.avgPriceOfQuoted(args.stops); /* ? */

const VsFQ = args.stops.map((v, i) => v.fee * VsQ[i]); /* ? */
const stopFees = zMath.sum(VsFQ); /* ? */

const loss = vSumEntriesQ * (
    zMath.sumBy(args.entries, v => v.volumePart / v.price)
  * zMath.sumBy(args.stops,   v => v.volumePart * v.price)
  - 1
);

expect(loss + entryFees + stopFees).to.roundEq(vRisk);