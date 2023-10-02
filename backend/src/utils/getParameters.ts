import { Range, Resolution } from '../enums';
import { timeRange } from '../types';

const getRangeFromUserRange: Record<string, Range> = {
  day: Range.OneDay,
  week: Range.OneWeek,
  month: Range.OneMonth,
  '3-month': Range.ThreeMonths,
  '6-month': Range.SixMonths,
  year: Range.OneYear,
};

const getTimeRangeFromRange: Record<Range, timeRange> = {
  [Range.OneDay]: {
    startTime: Math.floor(new Date().setDate(new Date().getDate() - 1) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
  [Range.OneWeek]: {
    startTime: Math.floor(new Date().setDate(new Date().getDate() - 7) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
  [Range.OneMonth]: {
    startTime: Math.floor(new Date().setMonth(new Date().getMonth() - 1) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
  [Range.ThreeMonths]: {
    startTime: Math.floor(new Date().setMonth(new Date().getMonth() - 3) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
  [Range.SixMonths]: {
    startTime: Math.floor(new Date().setMonth(new Date().getMonth() - 6) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
  [Range.OneYear]: {
    startTime: Math.floor(new Date().setFullYear(new Date().getFullYear() - 1) / 1000),
    endTime: Math.floor(Date.now() / 1000),
  },
};

const getResolutionFromRange: Record<Range, Resolution> = {
  [Range.OneDay]: Resolution.Minute1,
  [Range.OneWeek]: Resolution.Minute15,
  [Range.OneMonth]: Resolution.Minute60,
  [Range.ThreeMonths]: Resolution.Day,
  [Range.SixMonths]: Resolution.Day,
  [Range.OneYear]: Resolution.Day,
};

export { getTimeRangeFromRange, getResolutionFromRange, getRangeFromUserRange };
