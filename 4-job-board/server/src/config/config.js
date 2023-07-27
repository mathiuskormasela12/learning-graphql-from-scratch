// ========== Config
// import all packages
import process from 'process';
import 'dotenv/config';

export default {
  PORT: process.env?.SERVICE_APP_PORT,
  WHITELIST: process.env?.SERVICE_APP_WHITELIST?.split(',') ?? [],
};
