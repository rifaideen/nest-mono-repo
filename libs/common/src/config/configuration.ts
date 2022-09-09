const { env } = process;

export default () => ({
  auth_server_port: parseInt(env.AUTH_SERVER_PORT) || 3000,
  api_server_port: parseInt(env.API_SERVER_PORT) || 3001,
  database: {
    connectionString: env.DB_CONNECTION_STRING,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expirationTime: env.JWT_EXPIRATION_TIME || '7 days',
  },
});
