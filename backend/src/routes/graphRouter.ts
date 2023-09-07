import {getHistoricalStockDataByUserParameters} from '../bl'
import express from 'express';
import { getRangeFromUserRange } from '../utils';

const graphRouter = express.Router();

graphRouter.get('/:symbol/:range', async (req, res) =>
    await getHistoricalStockDataByUserParameters({symbol: req.params.symbol, range: getRangeFromUserRange[req.params.range]}));

export {graphRouter};
