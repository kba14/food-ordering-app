import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

/* export class MenuItemDto {
  @ApiProperty({ example: 'Margherita' })
  name: string;

  @ApiProperty({ example: 'Classic pizza' })
  description: string;

  @ApiProperty({ example: 8.5 })
  price: number;
} */

export class MenuItemResponseDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e96' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Margherita' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Classic pizza' })
  @Expose()
  description: string;

  @ApiProperty({ example: 8.5 })
  @Expose()
  price: number;
}

export class RestaurantResponseDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e96' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Pizza Palace' })
  @Expose()
  name: string;

  @ApiProperty({ type: [MenuItemResponseDto] })
  @Expose()
  @Type(() => MenuItemResponseDto)
  menu: MenuItemResponseDto[];
}
