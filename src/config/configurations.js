import { config } from 'dotenv';

config();
const envVars = process.env;
const configurations = Object.freeze({
  port: envVars.PORT,
  serviceUrl: envVars.SERVICE_URL
});
export default configurations;