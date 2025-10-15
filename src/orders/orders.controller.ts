import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  OrderResponseDto,
  UpdateOrderStatusDto,
} from 'src/common/dto/orders/order.dto';
import { Serialize } from 'src/common/dto/interceptors/serialize.interceptor';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Order created',
    type: OrderResponseDto,
  })
  @Serialize(OrderResponseDto)
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Get()
  @ApiQuery({ name: 'restaurantId', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  @Serialize(OrderResponseDto)
  findByRestaurant(@Query('restaurantId') restaurantId: string) {
    return this.ordersService.findByRestaurant(restaurantId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Order details',
    type: OrderResponseDto,
  })
  @Serialize(OrderResponseDto)
  findOne(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Updated order',
    type: OrderResponseDto,
  })
  @Serialize(OrderResponseDto)
  updateStatus(@Param('id') id: string, @Body() data: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, data);
  }
}
