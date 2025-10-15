import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Serialize } from 'src/common/dto/interceptors/serialize.interceptor';
import {
  MenuItemResponseDto,
  RestaurantResponseDto,
} from 'src/common/dto/restaurants/restaurants.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of restaurants',
    type: [RestaurantResponseDto],
  })
  @Serialize(RestaurantResponseDto)
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Restaurant details',
    type: RestaurantResponseDto,
  })
  @Serialize(RestaurantResponseDto)
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }

  @Get(':id/menu')
  @ApiResponse({
    status: 200,
    description: 'Restaurant menu',
    type: [MenuItemResponseDto],
  })
  @Serialize(MenuItemResponseDto)
  findMenu(@Param('id') id: string) {
    return this.restaurantsService.findMenu(id);
  }
}
