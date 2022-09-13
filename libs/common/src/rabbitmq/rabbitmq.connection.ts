import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connect } from 'amqp-connection-manager';
import { Channel } from "amqplib";

@Injectable()
export class RabbitmqConnection {
  private connectionString: string;
  private connected = false;
  private readonly logger = new Logger(RabbitmqConnection.name);

  constructor(private configService: ConfigService) {
    this.connectionString = this.configService.get<string>("rabbitmq.url");
  }

  /**
   * Establish RMQ connection and invoke the setupCallback
   * 
   * @param setupCallback Callback function to setup the exchanges and queues
   */
  establish(setupCallback:(channel: Channel) => void): void {
    this.logger.log('RabbitMQ establising connection');
    const server = connect([this.connectionString]);

    server.on('connect', () => {
      // ignore the connect event, if we are connected already
      if (this.connected) {
        return;
      }

      this.logger.log('RabbitMQ connection established. Creating channel.');
      this.connected = true;
      server.createChannel({
        json: false,
        setup: setupCallback
      });
    });

    server.on('disconnect', () => {
      this.logger.debug("Server disconnected");
    });

    server.on('connectFailed', ({ err }) => {
      this.logger.error('RabbitMQ connection failed: ' + err.message);
    });

    server.on('blocked', ({ reason }) => {
      this.logger.error(`RabbitMQ connection blocked: ${reason}`);
    });

    server.on('unblocked', () => {
      this.logger.error('RabbitMQ connection unblocked');
    });
  }
}
