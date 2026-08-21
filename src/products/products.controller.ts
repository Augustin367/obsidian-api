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
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  type CreateProductType,
  createProductSchema,
} from './schemas/create-product.schema';
import {
  UpdateProductSchema,
  type UpdateProductInput,
} from './schemas/update-product.schema';
import { urlSchema, type UrlInput } from '../scrappers/schemas/url.schema';
import { ScrappersService } from '../scrappers/services/scrappers.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('scrap')
  scrap(@Body(new ZodValidationPipe(urlSchema)) body: UrlInput) {
    return this.productsService.scrap(body.url);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createProductSchema))
    dto: CreateProductType,
  ) {
    console.log('DTO RECEBIDO:');
    console.dir(dto, { depth: null });

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
    dto: UpdateProductInput,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
