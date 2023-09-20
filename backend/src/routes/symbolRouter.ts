import express from 'express';
import { getStockDetails } from './../dal/getStockDetails';

const symbolRouter = express.Router();
symbolRouter.get('/stockData', async (req, res) => {
  const result = await getStockDetails();
  res.json(result);
});

export { symbolRouter };
