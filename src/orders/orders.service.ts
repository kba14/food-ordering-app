import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
} from 'src/common/dto/orders/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: CreateOrderDto) {
    const order = new this.orderModel(data);
    return order.save();
  }

  async findByRestaurant(restaurantId: string) {
    return this.orderModel.find({ restaurantId });
  }

  async findById(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, data: UpdateOrderStatusDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
