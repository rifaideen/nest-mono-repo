import { Module } from '@nestjs/common';
import { RabbitmqConnection } from './rabbitmq.connection';

@Module({
  providers: [RabbitmqConnection],
  exports: [RabbitmqConnection],
})
export class RabbitmqModule {}
