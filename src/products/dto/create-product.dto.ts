import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
