import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import type { UpdateProductDto } from './schemas/update-product.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type CreateProductDto,
  createProductSchema,
} from './schemas/create-product.schema';
import { UpdateProductSchema } from './schemas/update-product.schema';
import { ScrapProductsService } from './services/scrap-products.service';
import z from 'zod';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly scrapProductsService: ScrapProductsService,
  ) {}

  @Post('scrap')
  async createByScrap(
    @Body(new ZodValidationPipe(z.object({ url: z.string().url() })))
    body: {
      url: string;
    },
  ) {
    return this.scrapProductsService.execute(body.url);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createProductSchema))
    dto: CreateProductDto,
  ) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProductSchema))
    dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
