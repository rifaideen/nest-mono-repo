import { RabbitmqConnection } from '@app/common/rabbitmq/rabbitmq.connection';
import { Injectable, Logger } from '@nestjs/common';
import { PublishOptions } from 'amqp-connection-manager/dist/esm/ChannelWrapper';
import { Channel } from 'amqplib';

@Injectable()
export class RabbitMqService {
  private channel: Channel = null;
  private readonly logger = new Logger(RabbitMqService.name);

  constructor(private connection: RabbitmqConnection) {
    /**
     * Establish Rabbitmq connection
     * @param {Channel} channel - Rabbitmq channel
     */
    connection.establish(this.setup.bind(this));
  }

  /**
   * Setup exchanges, queues and bind queues.
   *
   * @param {Channel} channel - Rabbitmq channel
   */
  private async setup(channel: Channel): Promise<void> {
    this.channel = channel;

    const logger = this.logger;
    logger.log('Asserting exchanges and queues');

    const exchange = 'western-union';
    await channel.assertExchange(exchange, 'direct', { durable: true });
    const { queue: queue1 } = await channel.assertQueue('wu-india');
    channel.bindQueue(queue1, exchange, 'in');
    logger.log('Exchange created: ' + exchange);

    // Indian branch
    channel.consume(queue1, (msg: any) => {
      const message = msg.content.toString();
      const [amount, currency] = message.split(' ');
      logger.log('Received Message for wu-india', {
        amount,
        currency,
      });

      /**
       * @todo transfer money to India
       */

      channel.ack(msg);
    });

    // Sri Lankan branch
    const { queue: queue2 } = await channel.assertQueue('wu-sl');
    channel.bindQueue(queue2, exchange, 'sl');

    channel.consume(queue2, (msg: any) => {
      const message = msg.content.toString();
      const [amount, currency] = message.split(' ');
      logger.log('Received Message for wu-sl', {
        amount,
        currency,
      });

      /**
       * @todo transfer money to Sri Lanka
       */

      channel.ack(msg);
    });
  }

  /**
   * Publish a message to a queue
   * @param exchange
   * @param routingKey
   * @param message
   * @param options
   * @returns
   */
  async publish(
    exchange: string,
    routingKey: string,
    message: any,
    options?: PublishOptions,
  ): Promise<boolean> {
    this.logger.log('publish_message', {
      exchange,
      routingKey,
      message,
    });

    const msg =
      typeof message === 'string'
        ? Buffer.from(message)
        : Buffer.from(JSON.stringify(message));

    return this.channel.publish(exchange, routingKey, msg, options);
  }
}
