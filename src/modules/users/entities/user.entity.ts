import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserRole } from '@module/user-roles/entities/user-role.entity';
import { BaseEntity } from '@module/shared/base/base.entity';
import { Address, AddressSchema } from './address.entity';

export type UserDocument = HydratedDocument<User>;

export enum gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends BaseEntity {
  @Prop({ required: true, minlength: 2, maxlength: 50 })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({ match: /^([+]\d{2})?\d{10}$/ })
  phone: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'https://picsum.photos/200' })
  avatar: string;

  @Prop()
  birthday: Date;

  @Prop({ enum: gender })
  gender: string;

  @Prop({ default: 0 })
  point: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: UserRole.name,
  })
  role: UserRole;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop()
  headline: string;

  @Prop()
  friendly_id: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
