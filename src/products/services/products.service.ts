import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Product } from '../../generated/prisma/client';
import type { CreateProductType } from '../schemas/create-product.schema';
import { UpdateProductInput } from '../schemas/update-product.schema';
import { createHash } from 'crypto';
import { prepareProduct } from '../utils/prepareProduct';
import { ScrappersService } from '../../scrappers/services/scrappers.service';

type ProductModel = Product;

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly scrappersService: ScrappersService,
  ) {}

  private generateSourceHash(url: string): string {
    return createHash('sha256').update(url).digest('hex');
  }

  async create(dto: CreateProductType): Promise<ProductModel> {
    try {
      console.log('\n==== CREATE PRODUCT ====');

      console.log('[1] DTO recebido:');
      console.dir(dto, { depth: null });

      console.log('[2] Gerando sourceHash...');
      const sourceHash = this.generateSourceHash(dto.sourceUrl);
      console.log('[3] sourceHash:', sourceHash);

      console.log('[4] Executando findUnique...');
      const existing = await this.prisma.product.findUnique({
        where: { sourceHash },
      });

      console.log('[5] finUnique finalizado.');

      if (existing) {
        console.log('[6] Produto já existe:');
        console.dir(existing, { depth: null });
        return existing;
      }

      const product = prepareProduct(dto);

      const originalPrice = new Prisma.Decimal(product.originalPrice);
      const profit = new Prisma.Decimal(product.profit);
      const salePrice = originalPrice.plus(profit);

      const created = await this.prisma.product.create({
        data: {
          title: product.title,
          brand: product.brand,
          category: product.category,
          family: product.family,
          model: product.model,

          source: product.source,

          sourceUrl: product.sourceUrl,
          sourceHash,

          imageUrl: product.imageUrl ?? null,
          images: product.images ?? [],

          originalPrice,
          profit,
          salePrice,

          description: product.description ?? null,
          color: product.color ?? null,
          storage: product.storage ?? null,
          ram: product.ram ?? null,

          metadata: product.metadata
            ? (product.metadata as Prisma.InputJsonValue)
            : Prisma.JsonNull,
        },
      });

      console.log('Produto Criado:', created);

      return created;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<ProductModel | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateProductInput): Promise<ProductModel> {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async scrap(url: string) {
    const scraped = await this.scrappersService.scrap(url);

    const prepared = prepareProduct(scraped);

    return prepared;
  }
}
