import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';

import router from './routes/index.routes';
import swaggerDocument from './swagger/docs/swagger-output.json';
import { config } from 'dotenv'; 

const app = express();
config(); 

const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;