import {
  TradeInfoArgs,
  ETradeType,
  TradeOrderArg
} from './models';

interface ErrorInfo<T> {
  message: string;
  actual?: T;
}

type OrderError = {[key in keyof TradeOrderArg]?: ErrorInfo};

interface TradeOrderErrors {
  [orderIndex: number]: OrderError;
}

export interface IsNumberOptions {
  allowNaN?: boolean;
  allowInfinity?: boolean;
}

interface ValidationTradeErrors {
  tradeType?: ErrorInfo;
  deposit?: ErrorInfo;
  risk?: ErrorInfo;
  maxTradeVolumeQuoted?: ErrorInfo;
  leverage?: {
    allow?: ErrorInfo;
    max?: ErrorInfo;
  };
  breakeven?: {
    fee?: ErrorInfo;
  };

  entries?: TradeOrderErrors;
  stops?: TradeOrderErrors;
  takes?: TradeOrderErrors;
}

enum ERROR_MESSAGES {
  required = 'required field',
  number = 'should be a number',
  string = 'should be a string',
  boolean = 'should be a boolean',
}

export class ZValidations {
  private errors: ValidationTradeErrors = {};

  public isDefined(value: unknown): boolean {
    return value !== undefined && value !== null;
  }

  public isNumber(value: unknown, options: IsNumberOptions = {
    allowNaN: false,
    allowInfinity: false
  }): boolean {
    if (typeof value !== 'number') {
      return false;
    }

    if (value === Infinity || value === -Infinity) {
      return options.allowInfinity;
    }

    if (Number.isNaN(value)) {
      return options.allowNaN;
    }

    return Number.isFinite(value);
  }

  public isBoolean(value: unknown): boolean {
    return value instanceof Boolean || typeof value === 'boolean';
  }

  public isString(value: unknown): boolean {
    return value instanceof String || typeof value === 'string';
  }

  public min(value: number, minValue: number): boolean {
    return value >= minValue;
  }

  public max(value: number, maxValue: number): boolean {
    return value <= maxValue;
  }

  public getMaxStopLossPrice(p: TradeInfoArgs): number {
  //   return _.maxBy(p.stops, (o: TradeOrderArg) => o.price);
  }

  public checkEntriesOrder(p: TradeInfoArgs) {
    const isLongType = p.tradeType === ETradeType.Long;

    if (p.tradeType === ETradeType.Long) {
      //   const maxStopLossPrice: number = _.maxBy(p.stops, (o: TradeOrderArg) => o.price);
    }
    //
    if (p.tradeType === ETradeType.Short) {
      //
    }
  }

  public validateCommonFields(p: TradeInfoArgs): ValidationTradeErrors | null {
    // deposit
    if (!p.deposit && !this.isDefined(p.deposit)) {
      this.errors.deposit = {
        message: ERROR_MESSAGES.required,
      };
    }

    if (p.deposit && !this.isNumber(p.deposit)) {
      this.errors.deposit = {
        message: ERROR_MESSAGES.number,
      };
    }

    if (p.deposit && this.isNumber(p.deposit) && !this.min(p.deposit, 0)) {
      this.errors.deposit = {
        message: ERROR_MESSAGES.number,
      };
    }

    // risk
    if (!p.risk && !this.isDefined(p.risk)) {
      this.errors.risk = {
        message: ERROR_MESSAGES.required,
      };
    }

    if (p.risk && !this.isNumber(p.risk)) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
      };
    }

    if (p.risk && this.isNumber(p.risk) && !this.min(p.risk, 0)) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
        actual: p.risk,
      };
    }

    if (p.risk && this.isNumber(p.risk) && !this.max(p.risk, 1)) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
        actual: p.risk,
      };
    }

    // maxTradeVolumeQuoted
    if (!p.maxTradeVolumeQuoted && !this.isDefined(p.maxTradeVolumeQuoted)) {
      this.errors.maxTradeVolumeQuoted = {
        message: ERROR_MESSAGES.required,
      };
    }

    if (p.maxTradeVolumeQuoted && !this.isNumber(p.maxTradeVolumeQuoted)) {
      this.errors.maxTradeVolumeQuoted = {
        message: ERROR_MESSAGES.number,
      };
    }

    if (p.maxTradeVolumeQuoted
      && this.isNumber(p.maxTradeVolumeQuoted)
      && !this.min(p.maxTradeVolumeQuoted, 0)
    ) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
        actual: p.maxTradeVolumeQuoted,
      };
    }

    // leverage
    if (!p.leverage || !p.leverage.allow) {
      this.errors.leverage = {
        allow: {
          message: ERROR_MESSAGES.required,
        }
      };
    }

    if (p.leverage && p.leverage.allow && !this.isBoolean(p.leverage.allow)) {
      this.errors.leverage = {
        allow: {
          message: ERROR_MESSAGES.boolean,
        },
      };
    }

    if (!p.leverage || !p.leverage.max) {
      this.errors.leverage = {
        max: {
          message: ERROR_MESSAGES.required,
        }
      };
    }

    if (p.leverage && p.leverage.max && !this.isNumber(p.leverage.max)) {
      this.errors.leverage = {
        max: {
          message: ERROR_MESSAGES.required,
        }
      };
    }

    if (p.leverage
      && p.leverage.max
      && this.isNumber(p.leverage.max)
      && !this.min(p.leverage.max, 0)
    ) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
        actual: p.leverage.max,
      };
    }

    if (p.leverage
      && p.leverage.max
      && this.isNumber(p.leverage.max)
      && !this.max(p.leverage.max, 1000)
    ) {
      this.errors.risk = {
        message: ERROR_MESSAGES.number,
        actual: p.leverage.max,
      };
    }

    // tradeType
    if (!p.tradeType) {
      this.errors.tradeType = {
        message: ERROR_MESSAGES.required,
      };
    }

    if (p.tradeType && !this.isString(p.tradeType)) {
      this.errors.tradeType = {
        message: ERROR_MESSAGES.string,
      };
    }

    // breakeven
    if (!p.breakeven || !p.breakeven.fee) {
      this.errors.breakeven = {
        fee: {
          message: ERROR_MESSAGES.required,
        }
      };
    }

    if (p.breakeven && p.breakeven.fee && !this.isNumber(p.breakeven.fee)) {
      this.errors.breakeven = {
        fee: {
          message: ERROR_MESSAGES.number,
        }
      };
    }

    return Object.entries(this.errors).length === 0 && this.errors.constructor === Object
      ? this.errors
      : null;
  }

  public validate(p: TradeInfoArgs) {
    const isValidCommonFields = this.validateCommonFields(p);
  }

  private buildError(key: string, msg: string, path?: string): void {
    this.errors[key] = {
      message: msg,
    }
  }

  private setError() {}

  private cleanErrors(): void {
    this.errors = {};
  }
}
