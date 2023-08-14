import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopicDocument = HydratedDocument<Topic>;

@Schema()
export class Topic {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  description: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
