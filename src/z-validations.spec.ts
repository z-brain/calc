import { zValidations, ZValidations } from './z-validations';
import { ETradeType } from './models';

describe('ZValidations', () => {
  const zValidationsMock: ZValidations = zValidations;

  beforeEach(() => {
    // zValidationsMock = zValidations;
  });

  describe('validate', () => {
    it('should pass validation', () => {
      const testData = {
        deposit: 1000,
        risk: 0.01,
        leverage: {
          allow: true,
          max: 5,
        },
        tradeType: ETradeType.Long,
        breakeven: {
          fee: 0.001,
        },
        entries: [
          {
            price: 100,
            volumePart: 1,
            fee: 0.002,
          },
        ],
        stops: [
          {
            price: 90,
            volumePart: 1,
            fee: 0.001,
          },
        ],
        takes: [
          {
            price: 150,
            volumePart: 1,
            fee: 0.002,
          },
        ],
        maxTradeVolumeQuoted: 5000,
      };
      expect(zValidationsMock.validate(testData)).to.equal(undefined);
    });

    describe('Common section', () => {
      describe('deposit field', () => {
        it(`WHEN: absent deposit field
            THEN: should return validation error`, () => {
          const testData: any = {
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { deposit: { message: 'Required field' } },
          );
        });

        it(`WHEN: deposit value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 'test',
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { deposit: { message: 'Should be a number' } },
          );
        });

        it(`WHEN: send data with wrong value in deposit field
            THEN: should return validation error`, () => {
          const testData = {
            deposit: -1,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { deposit: { message: 'Value should be more then -1.', actual: -1 } },
          );
        });
      });

      describe('risk field', () => {
        it(`WHEN: send valid data
            THEN: should pass validation`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };
          const riskRangeValidValue = [0, 0.01, 0.05, 0.1];

          riskRangeValidValue.forEach((value): void => {
            testData.risk = value;
            expect(zValidationsMock.validate(testData)).to.equal(undefined);
          });
        });

        it(`WHEN: absent risk field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { risk: { message: 'Required field' } },
          );
        });

        it(`WHEN: risk value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 'test',
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { risk: { message: 'Should be a number' } },
          );
        });

        it(`WHEN: send less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: -0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };

          expect(zValidationsMock.validate(testData)).to.eql(
            { risk: { message: 'Value should be more then -0.01.', actual: -0.01 } },
          );
        });

        it(`WHEN: send more than max value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 2,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };

          expect(zValidationsMock.validate(testData)).to.eql(
            { risk: { message: 'Value should be less then 2.', actual: 2 } },
          );
        });
      });

      describe('maxTradeVolumeQuoted', () => {
        it(`WHEN: maxTradeVolumeQuoted value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 'test',
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { maxTradeVolumeQuoted: { message: 'Should be a number' } },
          );
        });

        it(`WHEN: send less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: -1,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { maxTradeVolumeQuoted: { message: 'Value should be more then -1.', actual: -1 } },
          );
        });

        it(`WHEN: send correct data
            THEN: should passed validation`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.equal(undefined);
        });
      });

      describe('leverage', () => {
        it(`WHEN: leverage max value less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: -1,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { leverage: { max: { message: 'Value should be more then -1.', actual: -1 } } },
          );
        });

        it(`WHEN: leverage max value more than maximum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 1001,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { leverage: { max: { message: 'Value should be less then 1001.', actual: 1001 } } },
          );
        });

        it(`WHEN: leverage value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 'test',
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { leverage: { max: { message: 'Should be a number' } } },
          );
        });
      });

      describe('tradeType', () => {
        it(`WHEN: absent tradeType field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { tradeType: { message: 'Required field' } },
          );
        });

        it(`WHEN: send wrong tradeType
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 1,
            },
            tradeType: 'test',
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { tradeType: { message: 'Wrong trade type', actual: 'test' } },
          );
        });
      });

      describe('fee', () => {
        it(`WHEN: absent fee field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { breakeven: { fee: { message: 'Required field' } } },
          );
        });

        it(`WHEN: fee value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 'test',
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { breakeven: { fee: { message: 'Should be a number' } } },
          );
        });

        it(`WHEN: fee value less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: -1,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { breakeven: { fee: { message: 'Value should be more then -1.', actual: -1 } } },
          );
        });

        it(`WHEN: fee value more than maximum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 10,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 2,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { breakeven: { fee: { message: 'Value should be less then 2.', actual: 2 } } },
          );
        });
      });
    });

    describe('Entries section', () => {
      it(`WHEN: entries absent
            THEN: should return validation error`, () => {
        const testData: any = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        expect(<any>zValidationsMock.validate(testData)).to.eql(
          { entries: { 0: { entity: { message: 'Required field' } } } },
        );
      });

      describe('price', () => {
        it(`WHEN: absent price field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            entries: { 0: { price: { message: 'Required field' } } },
          });
        });

        it(`WHEN: entries price value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 'test',
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            entries: { 0: { price: { message: 'Should be a number' } } },
          });
        });

        it(`WHEN: send order with wrong min price for entries
            THEN: should run validate min price for entries and price comparing stop price with the current price`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 10,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: -1, // <--
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              entries: { 0: { price: { message: 'Value should be more then -1.', actual: -1 } } },
              stops: { 0: { price: { message: 'Price 90 should be less then -1.', actual: 90 } } },
            },
          );
        });
      });

      describe('volumePart', () => {
        it(`WHEN: absent volumePart field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            entries: { 0: { volumePart: { message: 'Required field' } } },
          });
        });

        it(`WHEN: entries volumePart value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 'test',
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            entries: { 0: { volumePart: { message: 'Should be a number' } } },
          });
        });

        it(`WHEN: volumePart value less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: -1, // <--
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { entries: { 0: { volumePart: { message: 'Value should be more then -1.', actual: -1 } } } },
          );
        });

        it(`WHEN: volumePart value more than maximum value
            THEN: should run validate max volumePart and sum of volume parts`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1.2, // <--
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              entries: {
                0: {
                  entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 1.2 },
                  volumePart: { message: 'Value should be less then 1.2.', actual: 1.2 },
                },
              },
            },
          );
        });

        it(`WHEN: sum of volumePart more then 1
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1, // <--
                fee: 0.002,
              },
              {
                price: 100,
                volumePart: 1, // <--
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { entries: { 0: { entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 2 } } } },
          );
        });
      });

      describe('fee', () => {
        it(`WHEN: absent fee in entry data
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {                // <--
                price: 100,
                volumePart: 1,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { entries: { 0: { fee: { message: 'Required field' } } } },
          );
        });

        it(`WHEN: value in fee not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 'test', // <--
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { entries: { 0: { fee: { message: 'Should be a number' } } } },
          );
        });

        it(`WHEN: fee value in entries less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: -1, // <--
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              entries: { 0: { fee: { message: 'Value should be more then -1.', actual: -1 } } },
            },
          );
        });

        it(`WHEN: fee value in entries more than maximum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 2, // <--
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { entries: { 0: { fee: { message: 'Value should be less then 2.', actual: 2 } } } },
          );
        });
      });
    });

    describe('Stop section', () => {
      it(`WHEN: stop data absent
            THEN: should return validation error`, () => {
        const testData: any = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        expect(<any>zValidationsMock.validate(testData)).to.eql(
          { stops: { 0: { entity: { message: 'Required field' } } } },
        );
      });

      describe('price', () => {
        it(`WHEN: absent price field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            stops: { 0: { price: { message: 'Required field' } } },
          });
        });

        it(`WHEN: entries price value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 'test',
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            entries: { 0: { stops: { message: 'Should be a number' } } },
          });
        });

        it(`WHEN: send order with wrong min price
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 10,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: -1, // <--
                volumePart: 1,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              stops: { 0: { price: { message: 'Value should be more then -1.', actual: -1 } } },
            },
          );
        });
      });

      describe('volumePart', () => {
        it(`WHEN: absent volumePart field
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            stops: { 0: { volumePart: { message: 'Required field' } } },
          });
        });

        it(`WHEN: entries volumePart value not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1, // <--
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 'test', // <--
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql({
            stops: { 0: { volumePart: { message: 'Should be a number' } } },
          });
        });

        it(`WHEN: volumePart value less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: -1, // <--
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { stops: { 0: { volumePart: { message: 'Value should be more then -1.', actual: -1 } } } },
          );
        });

        it(`WHEN: volumePart value more than maximum value
            THEN: should run validate max volumePart and sum of volume parts`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1.2, // <--
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              stops: {
                0: {
                  entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 1.2 },
                  volumePart: { message: 'Value should be less then 1.2.', actual: 1.2 },
                },
              },
            },
          );
        });

        it(`WHEN: sum of volumePart more then 1
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 1000,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1, // <--
                fee: 0.001,
              },
              {
                price: 90,
                volumePart: 1, // <--
                fee: 0.001,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 5000,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { stops: { 0: { entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 2 } } } },
          );
        });
      });

      describe('fee', () => {
        it(`WHEN: absent fee in stops data
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {                // <--
                price: 90,
                volumePart: 1,
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { stops: { 0: { fee: { message: 'Required field' } } } },
          );
        });

        it(`WHEN: value in fee not a number
            THEN: should return validation error`, () => {
          const testData: any = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 'test', // <--
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          expect(<any>zValidationsMock.validate(testData)).to.eql(
            { stops: { 0: { fee: { message: 'Should be a number' } } } },
          );
        });

        it(`WHEN: fee value in entries less than minimum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: -1, // <--
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            {
              stops: { 0: { fee: { message: 'Value should be more then -1.', actual: -1 } } },
            },
          );
        });

        it(`WHEN: fee value in entries more than maximum value
            THEN: should return validation error`, () => {
          const testData = {
            deposit: 100,
            risk: 0.01,
            leverage: {
              allow: true,
              max: 5,
            },
            tradeType: ETradeType.Long,
            breakeven: {
              fee: 0.001,
            },
            entries: [
              {
                price: 100,
                volumePart: 1,
                fee: 0.001,
              },
            ],
            stops: [
              {
                price: 90,
                volumePart: 1,
                fee: 2, // <--
              },
            ],
            takes: [
              {
                price: 150,
                volumePart: 1,
                fee: 0.002,
              },
            ],
            maxTradeVolumeQuoted: 100,
          };
          expect(zValidationsMock.validate(testData)).to.eql(
            { stops: { 0: { fee: { message: 'Value should be less then 2.', actual: 2 } } } },
          );
        });
      });

      it(`WHEN: tradeType === 'long' and stops price bigger then entries price
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 1000,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long, // <--
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 110,
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 110, // <--
              volumePart: 0.5,
              fee: 0.001,
            },
            {
              price: 100,
              volumePart: 0.5,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 5000,
        };
        expect(zValidationsMock.validate(testData)).to.eql({ stops: {
          0: { price: { message: 'Price 110 should be less then 100.', actual: 110 } },
          1: { price: { message: 'Price 100 should be less then 100.', actual: 100 } },
        } });
      });

      it(`WHEN: tradeType === 'short' and stops price less then entries price
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 1000,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Short, // <--
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 110,
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 110, // <--
              volumePart: 0.5,
              fee: 0.001,
            },
            {
              price: 100,
              volumePart: 0.5,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 5000,
        };
        expect(zValidationsMock.validate(testData)).to.eql({ stops: {
          0: { price: { message: 'Price 110 should be more then 110.', actual: 110 } },
          1: { price: { message: 'Price 100 should be more then 110.', actual: 100 } },
        } });
      });
    });

    describe('Take section', () => {
      it(`WHEN: take data absent
            THEN: should return validation error`, () => {
        const testData: any = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        expect(<any>zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { entity: { message: 'Required field' } } } },
        );
      });

      it(`WHEN: send order with wrong min price
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 10,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: -1, // <--
              volumePart: 1,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          {
            takes: { 0: { price: { message: 'Price -1 should be more then 100.', actual: -1 } } },
          },
        );
      });

      it(`WHEN: volumePart value less than minimum value
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: -1, // <--
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { volumePart: { message: 'Value should be more then -1.', actual: -1 } } } },
        );
      });

      it(`WHEN: volumePart value more than maximum value
            THEN: should run validate max volumePart and sum of volume parts`, () => {
        const testData = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1.2, // <--
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          {
            takes: {
              0: {
                entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 1.2 },
                volumePart: { message: 'Value should be less then 1.2.', actual: 1.2 },
              },
            },
          },
        );
      });

      it(`WHEN: absent fee in takes data
            THEN: should return validation error`, () => {
        const testData: any = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {                // <--
              price: 150,
              volumePart: 1,
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        expect(<any>zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { fee: { message: 'Required field' } } } },
        );
      });

      it(`WHEN: value in fee not a number
            THEN: should return validation error`, () => {
        const testData: any = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: 'test', // <--
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        expect(<any>zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { fee: { message: 'Should be a number' } } } },
        );
      });

      it(`WHEN: fee value in entries less than minimum value
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: -1, // <--
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          {
            takes: { 0: { fee: { message: 'Value should be more then -1.', actual: -1 } } },
          },
        );
      });

      it(`WHEN: fee value in entries more than maximum value
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 100,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1,
              fee: 2, // <--
            },
          ],
          maxTradeVolumeQuoted: 100,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { fee: { message: 'Value should be less then 2.', actual: 2 } } } },
        );
      });

      it(`WHEN: sum of volumePart more then 1
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 1000,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long,
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100,
              volumePart: 1,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 1,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 150,
              volumePart: 1, // <--
              fee: 0.002,
            },
            {
              price: 150,
              volumePart: 1, // <--
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 5000,
        };
        expect(zValidationsMock.validate(testData)).to.eql(
          { takes: { 0: { entity: { message: 'Sum of volume parts should be no more than \'1\'', actual: 2 } } } },
        );
      });

      it(`WHEN: tradeType === 'long' and takes price less then entries price
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 1000,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Long, // <--
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 110,
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 90,
              volumePart: 0.5,
              fee: 0.001,
            },
            {
              price: 80,
              volumePart: 0.5,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 110, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 5000,
        };
        expect(zValidationsMock.validate(testData)).to.eql({ takes: {
          0: { price: { message: 'Price 110 should be more then 110.', actual: 110 } },
          1: { price: { message: 'Price 100 should be more then 110.', actual: 100 } },
        } });
      });

      it(`WHEN: tradeType === 'short' and takes price less then entries price
            THEN: should return validation error`, () => {
        const testData = {
          deposit: 1000,
          risk: 0.01,
          leverage: {
            allow: true,
            max: 5,
          },
          tradeType: ETradeType.Short, // <--
          breakeven: {
            fee: 0.001,
          },
          entries: [
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 110,
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          stops: [
            {
              price: 120,
              volumePart: 0.5,
              fee: 0.001,
            },
            {
              price: 130,
              volumePart: 0.5,
              fee: 0.001,
            },
          ],
          takes: [
            {
              price: 110, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
            {
              price: 100, // <--
              volumePart: 0.5,
              fee: 0.002,
            },
          ],
          maxTradeVolumeQuoted: 5000,
        };
        expect(zValidationsMock.validate(testData)).to.eql({ takes: {
          0: { price: { message: 'Price 110 should be less then 100.', actual: 110 } },
          1: { price: { message: 'Price 100 should be less then 100.', actual: 100 } },
        } });
      });
    });
  });
});
