import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  _id: ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordTokenExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
