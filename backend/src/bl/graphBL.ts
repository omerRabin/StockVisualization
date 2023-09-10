import { userParameters } from "../interfaces"
import {getTimeRangeFromRange, getResolutionFromRange} from '../utils'
import {fetchHistoricalStockData} from '../dal'

const getHistoricalStockDataByUserParameters = async (userParameters: userParameters) => {
    try {
        const response = await fetchHistoricalStockData({symbol: userParameters.symbol,
        resolution: getResolutionFromRange[userParameters.range],
        startTime: getTimeRangeFromRange[userParameters.range].startTime,
        endTime: getTimeRangeFromRange[userParameters.range].endTime,
        range: userParameters.range})

        return response;
        
    } catch(error) {
        console.error('Error in get Historical Stock Data By User Parameters :', error);
        throw error;
    }
}

export {getHistoricalStockDataByUserParameters} 