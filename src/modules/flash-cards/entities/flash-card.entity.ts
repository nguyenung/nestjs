import { BaseEntity } from '@module/shared/base/base.entity';
import { Topic } from '@module/topics/entities/topic.entity';
import { User } from '@module/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FlashCardDocument = mongoose.HydratedDocument<FlashCard>;

@Schema()
export class FlashCard extends BaseEntity {
  @Prop({ required: true, unique: true })
  vocabulary: string;

  @Prop({ required: true, default: 'https://picsum.photos/200' })
  image: string;

  @Prop({ required: true })
  definition: string;

  @Prop({ required: true })
  meaning: string;

  @Prop()
  pronunciation?: string;

  @Prop({ type: [String], required: true, default: [] })
  examples: string[];

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ required: true, default: false })
  is_public: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Topic.name }],
  })
  topics: Topic[];
}

export const FlashCardSchema = SchemaFactory.createForClass(FlashCard);
