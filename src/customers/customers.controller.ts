import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  CustomerResponseDto,
} from 'src/common/dto/customers/customer.dto';
import { Serialize } from 'src/common/dto/interceptors/serialize.interceptor';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'Customer created',
    type: CustomerResponseDto,
  })
  @Serialize(CustomerResponseDto)
  create(@Body() data: CreateCustomerDto) {
    return this.customersService.create(data);
  }

  @Get()
  @Serialize(CustomerResponseDto)
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CustomerResponseDto],
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Customer details',
    type: CustomerResponseDto,
  })
  @Serialize(CustomerResponseDto)
  findOne(@Param('id') id: string) {
    return this.customersService.findById(id);
  }
}
