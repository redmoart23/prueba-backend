import { Injectable } from '@nestjs/common';
import { Producto } from 'generated/prisma';
import { PrismaService } from 'src/prisma-client/prima-client.service';
import { seedProducts } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService, // Assuming PrismaService is imported from the correct path
  ) {}

  async executeSeed(): Promise<boolean> {
    // Delete database records
    await this.deleteDatabaseRecords();

    // Products seed
    await this.productsSeed();

    return true;
  }

  async deleteDatabaseRecords() {
    await this.prisma.$transaction([this.prisma.producto.deleteMany({})]);
  }

  async productsSeed(): Promise<Producto[]> {
    await this.prisma.producto.createMany({ data: seedProducts });

    return await this.prisma.producto.findMany();
  }
}
