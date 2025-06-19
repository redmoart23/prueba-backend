import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-client/prima-client.service';

const mockProducto = {
  id: '1',
  nombre: 'Test Product',
  precio: 100,
  stock: 10,
};

const prismaMock = {
  producto: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      prismaMock.producto.create.mockResolvedValue(mockProducto);

      const result = await service.create({
        nombre: 'Test Product',
        precio: 100,
        stock: 10,
      });

      expect(result).toEqual(mockProducto);
      expect(prismaMock.producto.create).toHaveBeenCalledWith({
        data: {
          nombre: 'Test Product',
          precio: 100,
          stock: 10,
        },
      });
    });

    it('should throw error if creation fails', async () => {
      prismaMock.producto.create.mockRejectedValue(new Error('DB error'));

      await expect(
        service.create({
          nombre: 'Test Product',
          precio: 100,
          stock: 10,
        }),
      ).rejects.toThrow('Failed to create product');
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      prismaMock.producto.findMany.mockResolvedValue([mockProducto]);

      const result = await service.findAll();

      expect(result).toEqual([mockProducto]);
      expect(prismaMock.producto.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      prismaMock.producto.findUnique.mockResolvedValue(mockProducto);

      const result = await service.findOne('1');

      expect(result).toEqual(mockProducto);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.producto.findUnique.mockResolvedValue(null);

      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      prismaMock.producto.findUnique.mockResolvedValue(mockProducto);
      prismaMock.producto.update.mockResolvedValue({
        ...mockProducto,
        nombre: 'Updated',
      });

      const result = await service.update('1', {
        nombre: 'Updated',
        precio: 120,
        stock: 5,
      });

      expect(result.nombre).toBe('Updated');
      expect(prismaMock.producto.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          nombre: 'Updated',
          precio: 120,
          stock: 5,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete the product and return confirmation', async () => {
      prismaMock.producto.findUnique.mockResolvedValue(mockProducto);
      prismaMock.producto.delete.mockResolvedValue(mockProducto);

      const result = await service.remove('1');

      expect(result).toEqual({
        message: 'Product with id 1 deleted successfully',
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.producto.findUnique.mockResolvedValue(null);

      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
});
