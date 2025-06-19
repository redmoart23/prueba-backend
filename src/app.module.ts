import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ProductsModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
