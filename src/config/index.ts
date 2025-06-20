import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

export type ConfigType = {
  API_PORT: number;
  NODE_ENV: string;
  DB_URL: string;
  ACCESS_TOKEN_KEY: string;
  ACCES_TOKEN_TIME: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_TIME: string | undefined;
  FILE_PATH: string | undefined;
  BASE_API: string | undefined;
  BILIM_XAZNA_API: string | undefined;
};

const requiredVariables = [
  'API_PORT',
  'NODE_ENV',
  'DEV_DB_URL',
  'PROD_DB_URL',
  'ACCESS_TOKEN_KEY',
  'ACCES_TOKEN_TIME',
  'REFRESH_TOKEN_KEY',
  'REFRESH_TOKEN_TIME',
  'FILE_PATH',
  'BASE_API',
  'BILIM_XAZNA_API',
];

const missingVariables = requiredVariables.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  Logger.error(`Missing environment variables: ${missingVariables.join(', ')}`);
  process.exit(1);
}

export const config: ConfigType = {
  API_PORT: Number(process.env.API_PORT),
  NODE_ENV: process.env.NODE_ENV as string,

  DB_URL:
    process.env.NODE_ENV === 'dev'
      ? (process.env.DEV_DB_URL as string)
      : (process.env.PROD_DB_URL as string),
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  ACCES_TOKEN_TIME: process.env.ACCES_TOKEN_TIME as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  FILE_PATH: process.env.FILE_PATH,
  BASE_API: process.env.BASE_API,
  BILIM_XAZNA_API: process.env.BILIM_XAZNA_API,
};
