const { env } = process;

export default () => ({
  auth_server_port: parseInt(env.AUTH_SERVER_PORT) || 3000,
  api_server_port: parseInt(env.API_SERVER_PORT) || 3001,
  email_server_port: parseInt(env.EMAIL_SERVER_PORT) || 3002,
  database: {
    connectionString: env.DB_CONNECTION_STRING,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expirationTime: env.JWT_EXPIRATION_TIME || '7 days',
  },
  rabbitmq: {
    url: env.RMQ_URL,
    emailQueue: env.RMQ_EMAIL_QUEUE,
  },
});
