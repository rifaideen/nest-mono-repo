import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  /**
   * Find user by email
   *
   * @todo: Find user from users collection
   * @param username string
   * @returns User | undefined
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.model.findOne({ email }).lean();
  }

  async create(user: User): Promise<User> {
    return this.model.create(user);
  }
}
