const { env } = process;

export default () => ({
  auth_port: parseInt(env.PORT) || 3000,
  api_port: parseInt(env.API_PORT) || 3001,
  database: {
    connectionString: env.DB_CONNECTION_STRING,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expirationTime: env.JWT_EXPIRATION_TIME || '7 days',
  },
});
