import express from 'express';
import { graphRouter } from './graphRouter';

const router = express.Router();

router.use('/api/data/graph', graphRouter);
// Declare all routes on router
export { router as mainRouter };
