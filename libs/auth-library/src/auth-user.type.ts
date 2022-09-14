import { ObjectId } from 'mongoose';

export type AuthUserType = {
  _id: ObjectId;

  firstName: string;

  lastName: string;

  email: string;
};
