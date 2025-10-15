import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the customer' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the customer',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CustomerResponseDto {
  @ApiProperty({ example: '671a9a3338c9f2f2892f6e96' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the customer' })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the customer',
  })
  @Expose()
  email: string;
}
