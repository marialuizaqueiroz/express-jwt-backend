import dotenv from 'dotenv';
dotenv.config();


if (!process.env.JWT_SECRET) {
  throw new Error('ERRO FATAL: A variável de ambiente JWT_SECRET não está definida.');
}

if (!process.env.MONGO_URI) {
  throw new Error('ERRO FATAL: A variável de ambiente MONGO_URI não está definida.');
}

interface IConfig {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

const config: IConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,

  mongoUri: process.env.MONGO_URI as string,

  jwtSecret: process.env.JWT_SECRET as string,

  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '1h') as string
};

export default config;