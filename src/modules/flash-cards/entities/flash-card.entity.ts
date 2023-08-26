import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlashCardDocument = HydratedDocument<FlashCard>;

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

  @Prop({ required: true })
  pronunciation: string;

  @Prop({ required: true })
  examples: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ required: true, default: false })
  is_public: boolean;
}

export const FlashCardSchema = SchemaFactory.createForClass(FlashCard);
