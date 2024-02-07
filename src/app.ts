import express from 'express';
import { loadControllers, scopePerRequest } from 'awilix-express';
import container from './config/container';
import connectDB from './config/mongo';

import dotenv from 'dotenv';
import initHydra from './config/hydraConfig';
dotenv.config();

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(scopePerRequest(container));

  await initHydra();
  
  // Conexion a la base de datos
  connectDB();

  app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
  ));

  app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

startServer().catch(err => {
  console.error('Error starting server', err);
  process.exit(1);
});


export default startServer;