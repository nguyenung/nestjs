import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema()
export class UserRole {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
