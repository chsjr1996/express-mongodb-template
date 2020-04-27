export default {
  isDev: process.env.DEV,
  port: process.env.PORT,
  database: process.env.DATABASE,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
};
