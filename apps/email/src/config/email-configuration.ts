const { env } = process;

export default () => ({
  email: {
    transport: env.EMAIL_TRANSPORT,
    defaults: {
      from: env.EMAIL_FROM || 'no-reply@example.com',
    }
  }
});
