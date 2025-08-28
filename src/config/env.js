import dotenv from "dotenv";
dotenv.config(); // Load .env variables

const env = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  apikey: process.env.CMC_API_KEY
};

export default env;
