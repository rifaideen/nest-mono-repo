const { env } = process;

export default () => ({
  port: parseInt(env.API_SERVER_PORT) || 3001,
});
