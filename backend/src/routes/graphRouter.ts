import express from 'express';
import {getHistoricalStockDataByUserParameters} from '../bl'
import { getRangeFromUserRange } from '../utils';

const graphRouter = express.Router();

graphRouter.get('/', async (req, res) => {
    const symbol = req.query.symbol as string;
    const range = req.query.range as string;

    if (!symbol || !range) {
        return res.status(400).json({ error: 'Both symbol and range parameters are required.' });
    }  
  
    res.json(await getHistoricalStockDataByUserParameters({symbol, range: getRangeFromUserRange[range]}));
  });
  
         

export {graphRouter};
