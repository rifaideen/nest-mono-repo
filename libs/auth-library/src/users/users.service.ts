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

  async all(): Promise<User[]> {
    return this.model.find();
  }

  async updateOne(condition: Record<string, any>, update: any) {
    return this.model.updateOne(condition, update);
  }

  async findOneAndUpdate(
    condition: Record<string, any>,
    update: any,
  ): Promise<User> {
    return this.model.findOneAndUpdate(condition, update, { new: true });
  }

  async findOne(
    condition: Record<string, any>,
  ): Promise<UserDocument | undefined> {
    return this.model.findOne(condition);
  }
}
