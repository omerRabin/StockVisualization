import express from 'express';
import { mainRouter } from './routes';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(mainRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})