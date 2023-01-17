import dotenv from 'dotenv';
import { runServer } from './service/service';

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

runServer(PORT);
