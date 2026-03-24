import dotenv from 'dotenv';
import app from './lib/expressApp.js';

dotenv.config();

const port = Number(process.env.PORT) || 4000;

if (!process.env.VERCEL) {
  app.listen(port, () => console.log('Corriendo por el ' + port));
}
