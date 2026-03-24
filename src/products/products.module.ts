import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScrapProductsService } from './services/scrap-products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ScrapProductsService],
  imports: [PrismaModule],
})
export class ProductsModule {}
