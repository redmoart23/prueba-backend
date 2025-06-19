import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsNumber()
  precio: Decimal;

  @IsNumber()
  @Min(0)
  stock: number;
}
