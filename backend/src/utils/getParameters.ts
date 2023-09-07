import { Range, Resolution } from "../enums";
import { timeRange } from "../interfaces";

const getRangeFromUserRange: Record<string, Range> = {
    'day' : Range.OneDay,
    'week' : Range.OneWeek,
    'month' : Range.OneMonth,
    '3-month' : Range.ThreeMonths,
    '6-month' : Range.SixMonths,
    'year' : Range.OneYear
}

const getTimeRangeFromRange: Record<Range, timeRange> = {
    [Range.OneDay] : {startTime: (new Date().setDate(new Date().getDate()-1)), endTime: Date.now()},
    [Range.OneWeek] : {startTime: (new Date().setDate(new Date().getDate()-7)), endTime: Date.now()},
    [Range.OneMonth] : {startTime: (new Date().setMonth(new Date().getMonth() - 1)), endTime: Date.now()},
    [Range.ThreeMonths] : {startTime: (new Date().setMonth(new Date().getMonth() - 3)), endTime: Date.now()},
    [Range.SixMonths] : {startTime: (new Date().setMonth(new Date().getMonth() - 6)), endTime: Date.now()},
    [Range.OneYear] : {startTime: (new Date().setFullYear(new Date().getFullYear() - 1)), endTime: Date.now()}
}

const getResolutionFromRange: Record<Range, Resolution> = {
    [Range.OneDay]: Resolution.Minute5,
    [Range.OneWeek]: Resolution.Minute15,
    [Range.OneMonth]: Resolution.Minute60,
    [Range.ThreeMonths]: Resolution.Day,
    [Range.SixMonths]: Resolution.Day,
    [Range.OneYear]: Resolution.Week,
};


export {getTimeRangeFromRange, getResolutionFromRange, getRangeFromUserRange}