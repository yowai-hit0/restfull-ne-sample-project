import { IsInt, Min, IsDateString, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  bookId: number;

  @IsDateString()
  endDate: string;        // ISO date string

  @Min(0)
  price: number;
}

export class ListBookingQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;        // matches orderId or book.name

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
