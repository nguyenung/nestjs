import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address extends BaseEntity {
  @Prop({ minlength: 2, maxlength: 120 })
  street?: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  city: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  state: string;

  @Prop({ required: false, minlength: 2, maxlength: 50 })
  portal_code: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
