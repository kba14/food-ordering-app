import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class OrderItem {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  instructions?: string;
}

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId: string;

  @Prop({
    required: true,
    enum: ['received', 'preparing', 'ready', 'delivered'],
    default: 'received',
  })
  status: string;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
