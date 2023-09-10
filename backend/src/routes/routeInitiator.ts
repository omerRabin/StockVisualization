import express from 'express';
import { graphRouter } from '.';

const router = express.Router();

router.use('/api/data/graph', graphRouter);

export { router as mainRouter };
