import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import { initiateModuleRoutes } from './modules/routes';
import { handleError } from './helpers/errorhandler';
import express, { Request, Response, NextFunction } from 'express';


const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));



app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (_req, res) => res.send(''));

app.get('/status', (_req, res) => res.status(200).end());

app.head('/status', (_req, res) => res.status(200).end());

initiateModuleRoutes(app);

app.use((req, res, _next): void => {
  res.status(404).send({
    success: false,
    error: 'notFound',
    message: `resource '${req.url}' not found`,
    data: null
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res);
});

process.on('uncaughtException', (error: Error) => {
  handleError(error);
});

process.on('unhandledRejection', (reason: Error) => {
  handleError(reason);
});

export default app;
