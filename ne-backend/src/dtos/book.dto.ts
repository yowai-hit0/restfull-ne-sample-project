// src/dtos/book.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  author: string;

  @IsString() @IsNotEmpty()
  publisher: string;

  @IsString() @IsNotEmpty()
  publicationYear: string;

  @IsString() @IsNotEmpty()
  subject: string;
}

export class UpdateBookDto {
  @IsOptional() @IsString() @IsNotEmpty()
  name?: string;

  @IsOptional() @IsString() @IsNotEmpty()
  author?: string;

  @IsOptional() @IsString() @IsNotEmpty()
  publisher?: string;

  @IsOptional() @IsString() @IsNotEmpty()
  publicationYear?: string;

  @IsOptional() @IsString() @IsNotEmpty()
  subject?: string;
}
