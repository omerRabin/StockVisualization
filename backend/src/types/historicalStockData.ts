import { RawCandleData } from "../interfaces";

export type historicalStockData = {
    candlesClosedPricesList: RawCandleData['c'];
    candlesHighestPricesList: RawCandleData['h'];
    candlesLowestPricesList: RawCandleData['l'];
    candlesOpenPricesList: RawCandleData['o'];
    status: RawCandleData['s'];
    candlesTimestampList: RawCandleData['t'];
    candlesVolumeDataList: RawCandleData['v'];
} 