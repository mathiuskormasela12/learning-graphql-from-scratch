// ========= Config
// import all packages
import 'dotenv/config'
import process from 'process'

export default {
  PORT: process.env?.SERVICE_PORT ?? 3000,
  WHITELIST: process.env?.SERVICE_WHITELIST?.split(',') ?? []
}
