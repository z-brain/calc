import { ETradeType } from './models';
import { ZRisk } from './z-risk';
import { ZMath } from './z-math';
import * as index from './index';

describe('index.ts', () => {
  it(`should export an instance of ${ZRisk.name} class as the "zRisk" variable`, () => {
    expect(index.zRisk).to.be.instanceOf(ZRisk);
  });
  it(`should export an instance of ${ZMath.name} class as the "zMath" variable`, () => {
    expect(index.zMath).to.be.instanceOf(ZMath);
  });

  describe('Contracts Testing', () => {
    it('ETradeType', () => {
      expect(index.ETradeType.Long).to.eq('long');
      expect(index.ETradeType.Short).to.eq('short');
      expect(Object.keys(index.ETradeType).length).to.eq(2);
    });

    it('PriceAndVolumePart should be exported', () => {
      const data: index.PriceAndVolumePart = {
        price: 1000,
        volumePart: .5,
      };
    });

    it('BreakevenPriceArgs should be exported', () => {
      const data: index.BreakevenPriceArgs = {
        breakeven: { fee: .002 },
        totalVolume: {
          entries: {
            orders: { quoted: 1000, base: 10 },
            fees: { quoted: 10 },
          },
        },
      };
    });

    it('TradeInfo should be exported', () => {
      const data: index.TradeInfo = {
        deposit: 1000,
        risk: .01,
        leverage: {
          allow: true,
          maxTimes: 10,
          actualTimes: 2.2,
        },
        maxTradeVolumeQuoted: 10000,
        tradeType: ETradeType.Long,
        avgPrices: {
          entry: 1000,
          stop: 800,
          take: 2000,
        },
        breakeven: {
          fee: .002,
          price: 1100,
        },
        entries: [{
          price: 1000,
          fee: .001,
          volumePart: 1,
          volumeBase: 1,
          volumeQuoted: 1000,
          feeVolumeBase: .0001,
          feeVolumeQuoted: .1,
        }],
        stops: [{
          price: 1000,
          fee: .001,
          volumePart: 1,
          volumeBase: 1,
          volumeQuoted: 1000,
          feeVolumeBase: .0001,
          feeVolumeQuoted: .1,
        }],
        takes: [{
          price: 1000,
          fee: .001,
          volumePart: 1,
          volumeBase: 1,
          volumeQuoted: 1000,
          feeVolumeBase: .0001,
          feeVolumeQuoted: .1,
        }],
        totalVolume: {
          lossQuoted: 100,
          profitQuoted: 1000,
          entries: {
            fees:   { base: 1, quoted: 10 },
            orders: { base: 10, quoted: 1000 },
          },
          stops: {
            fees:   { base: 1, quoted: 10 },
            orders: { base: 10, quoted: 1000 },
          },
          takes: {
            fees:   { base: 1, quoted: 10 },
            orders: { base: 10, quoted: 1000 },
          },
        },
      };
    });

    it('TradeInfoArgs should be exported', () => {
      const data: index.TradeInfoArgs = {
        deposit: 1000,
        risk: .01,
        leverage: {
          allow: true,
          maxTimes: 10,
        },
        maxTradeVolumeQuoted: 10000,
        tradeType: ETradeType.Long,
        breakeven: {
          fee: .002,
        },
        entries: [{
          price: 1000,
          fee: .001,
          volumePart: 500,
        }],
        stops: [{
          price: 1000,
          fee: .001,
          volumePart: 500,
        }],
        takes: [{
          price: 1000,
          fee: .001,
          volumePart: 500,
        }],
      };
    });

    it('TradeOrder should be exported', () => {
      const data: index.TradeOrderArg = {
        price: 1000,
        fee: .001,
        volumePart: 500,
      };
    });

    it('TradeOrderArg should be exported', () => {
      const data: index.TradeOrder = {
        price: 1000,
        fee: .001,
        volumePart: 500,
        volumeBase: 1,
        volumeQuoted: 1000,
        feeVolumeBase: .001,
        feeVolumeQuoted: 1,
      };
    });

    it('TradeVolumeArgs should be exported', () => {
      const data: index.TradeVolumeArgs = {
        deposit: 1000,
        risk: .01,
        entries: [
          {
            price: 1000,
            fee: .001,
            volumePart: 1,
          },
        ],
        stops: [
          {
            price: 1000,
            fee: .001,
            volumePart: 1,
          },
        ],
      };
    });

    it('TradeVolumeManagement should be exported', () => {
      const data: index.TradeVolumeManagement = {
        deposit: 1000,
        risk: .01,
        leverage: {
          allow: true,
          maxTimes: 3,
          actualTimes: 2.2,
        },
        maxTradeVolumeQuoted: 100000,
        totalTradeVolumeQuoted: 1000,
      };
    });

    it('TradeVolumeManagementArgs should be exported', () => {
      const data: index.TradeVolumeManagementArgs = {
        deposit: 1000,
        risk: .01,
        leverage: {
          allow: true,
          maxTimes: 3,
        },
        maxTradeVolumeQuoted: 100000,
        preliminaryVolume: 1000,
      };
    });

  });

});
