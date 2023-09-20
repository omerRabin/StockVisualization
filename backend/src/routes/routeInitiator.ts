import express from 'express';
import { graphRouter, symbolRouter } from '.';

const router = express.Router();

router.use('/api/data/graph', graphRouter);
router.use('/api/data/stockDetails', symbolRouter);

export { router as mainRouter };
