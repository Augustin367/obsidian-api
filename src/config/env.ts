export default () => ({
  databaseUrl: process.env.DATABASE_URL,
  scrapperUrl: process.env.SCRAPPER_URL,
  redisUrl: process.env.REDIS_URL,
});
