import dotenv from 'dotenv';

const envVars = dotenv.config().parsed;
const configurations = {
  PORT: envVars.PORT,
  serviceUrl: envVars.serviceUrl
};

Object.freeze(configurations);

console.log(configurations)
export default configurations;