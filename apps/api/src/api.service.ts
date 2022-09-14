import { Injectable } from '@nestjs/common';
import { RabbitMqService } from './services/rabbitmq.service';

@Injectable()
export class ApiService {
  constructor(private rmqService: RabbitMqService) {}

  /**
   * This method is used to transfer money to an account in any country.
   * @param {number} amount - The amount of money to transfer.
   * @param {string} currency - The currency of the money to transfer.
   * @param {string} country - The country to transfer the money to.
   * @returns {Promise<any>}
   */
  transfer(amount: number, currency: string, country: string): Promise<any> {
    return this.rmqService.publish(
      'western-union',
      country,
      `${amount} ${currency}`,
    );
  }
}
