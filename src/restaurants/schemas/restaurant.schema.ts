import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item, ItemSchema } from './item.schema';

@Schema()
export class Restaurant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [ItemSchema], default: [] })
  menu: Item[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
