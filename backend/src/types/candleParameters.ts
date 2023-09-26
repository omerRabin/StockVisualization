import { Range, Resolution } from '../enums';
import { timeRange } from './timeRange';

export interface RawCandleData {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}

export interface userParameters {
  symbol: string;
  range: Range;
}

export interface candleParameters extends userParameters, timeRange {
  resolution: Resolution;
}
