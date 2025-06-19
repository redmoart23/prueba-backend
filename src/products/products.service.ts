import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma-client/prima-client.service';
import { Producto } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Producto> {
    try {
      return await this.prisma.producto.create({
        data: createProductDto,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async findAll(): Promise<Producto[]> {
    return await this.prisma.producto.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<Producto> {
    const product = await this.prisma.producto.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Producto> {
    await this.findOne(id);

    const updatedProduct = await this.prisma.producto.update({
      where: { id },
      data: updateProductDto,
    });

    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prisma.producto.delete({
      where: { id },
    });
    return {
      message: `Product with id ${id} deleted successfully`,
    };
  }
}
