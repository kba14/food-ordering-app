import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    example: '671a9a3338c9f2f2892f6e95',
    description: 'Menu item ID',
  })
  @IsMongoId()
  itemId: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'Extra cheese', required: false })
  @IsString()
  @IsOptional()
  instructions?: string;
}

export class OrderItemResponseDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e95' })
  @Expose()
  itemId: string;

  @ApiProperty({ example: 2 })
  @Expose()
  quantity: number;

  @ApiProperty({ example: 'Extra cheese', required: false })
  @Expose()
  instructions?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e91' })
  @IsMongoId()
  customerId: string;

  @ApiProperty({ example: '671a9a3338c9f2f2892f6e92' })
  @IsMongoId()
  restaurantId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'preparing' })
  @IsIn(['received', 'preparing', 'ready', 'delivered'])
  status: string;
}

export class OrderResponseDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e96' })
  @Expose()
  id: string;

  @ApiProperty({ example: '671a9a3338c9f2f2892f6e91' })
  @Expose()
  customerId: string;

  @ApiProperty({ example: '671a9a3338c9f2f2892f6e92' })
  @Expose()
  restaurantId: string;

  @ApiProperty({
    example: 'received',
    enum: ['received', 'preparing', 'ready', 'delivered'],
  })
  @Expose()
  status: string;

  @ApiProperty({ type: [OrderItemResponseDto] })
  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}
