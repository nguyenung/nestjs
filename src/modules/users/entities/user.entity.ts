import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { UserRole } from '@module/user-roles/entities/user-role.entity';
import { BaseEntity } from '@module/shared/base/base.entity';
import { Address, AddressSchema } from './address.entity';
import { FlashCardDocument } from '@module/flash-cards/entities/flash-card.entity';
import { CollectionDocument } from '@module/collections/entities/collection.entity';
import { NextFunction } from 'express';

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
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User extends BaseEntity {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 50,
    set: (first_name: string) => {
      return first_name.trim();
    },
  })
  first_name: string;

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 50,
    set: (last_name: string) => {
      return last_name.trim();
    },
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
    get: (phoneNumber: string) => {
      if (!phoneNumber) {
        return;
      }
      const lastThreeDigits = phoneNumber.slice(phoneNumber.length - 4);
      return `****-***-${lastThreeDigits}`;
    },
  })
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

  default_address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = (
  flashCardModel: Model<FlashCardDocument>,
  collectionModel: Model<CollectionDocument>,
) => {
  const userSchema = UserSchema;
  userSchema.virtual('default_address').get(function (this: UserDocument) {
    if (this.address) {
      return `${(this.address.street && ' ') || ''}${this.address.city} ${
        this.address.state
      } ${this.address.country}`;
    }
  });

  userSchema.pre('findOneAndDelete', async function (next: NextFunction) {
    const user = await this.model.findOne(this.getFilter());
    await Promise.all([
      flashCardModel.deleteMany({ user: user._id }).exec(),
      collectionModel.deleteMany({ user: user._id }).exec(),
    ]);
    return next();
  });
  return userSchema;
};
