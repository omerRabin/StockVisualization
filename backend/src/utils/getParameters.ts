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
  [Range.OneDay]: { startTime: new Date().setDate(new Date().getDate() - 1), endTime: Date.now() },
  [Range.OneWeek]: { startTime: new Date().setDate(new Date().getDate() - 7), endTime: Date.now() },
  [Range.OneMonth]: { startTime: new Date().setMonth(new Date().getMonth() - 1), endTime: Date.now() },
  [Range.ThreeMonths]: { startTime: new Date().setMonth(new Date().getMonth() - 3), endTime: Date.now() },
  [Range.SixMonths]: { startTime: new Date().setMonth(new Date().getMonth() - 6), endTime: Date.now() },
  [Range.OneYear]: { startTime: new Date().setFullYear(new Date().getFullYear() - 1), endTime: Date.now() },
};

const getResolutionFromRange: Record<Range, Resolution> = {
  [Range.OneDay]: Resolution.Day,
  [Range.OneWeek]: Resolution.Day,
  [Range.OneMonth]: Resolution.Day,
  [Range.ThreeMonths]: Resolution.Day,
  [Range.SixMonths]: Resolution.Day,
  [Range.OneYear]: Resolution.Day,
};

export { getTimeRangeFromRange, getResolutionFromRange, getRangeFromUserRange };
