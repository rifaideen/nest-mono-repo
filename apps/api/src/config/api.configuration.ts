const { env } = process;

export default () => ({
  port: parseInt(env.API_PORT) || 3000,
});
