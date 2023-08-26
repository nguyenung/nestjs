import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection extends BaseEntity {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  level: number;

  @Prop()
  order: number;

  @Prop({ default: 'https://picsum.photos/200' })
  image: string;

  @Prop({ required: true, default: false })
  is_public: boolean;

  @Prop({ required: true, default: 0 })
  total_flash_cards: number;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
