import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import config from './config/index.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', routes);


app.listen(config.port, () => console.log(`auth_micro running at http://localhost:${config.port}/api`));