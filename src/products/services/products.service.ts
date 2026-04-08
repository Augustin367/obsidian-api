import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import type { CreateProductDto } from '../schemas/create-product.schema';
import type { UpdateProductDto } from '../schemas/update-product.schema';

type ProductWithSmartPhone = Prisma.ProductGetPayload<{
  include: { smartPhone: true };
}>;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<ProductWithSmartPhone> {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        sourceUrl: dto.sourceUrl,
        price: dto.price,
        description: dto.description,
        color: dto.color,
        brand: dto.brand,
        userId: dto.userId,
        smartPhone:
          dto.type === 'SMARTPHONE'
            ? { create: { memory: dto.memory! } }
            : undefined,
      },
      include: { smartPhone: true },
    });
  }

  async findAll(): Promise<ProductWithSmartPhone[]> {
    return this.prisma.product.findMany({
      include: { smartPhone: true },
    });
  }

  async findOne(id: string): Promise<ProductWithSmartPhone | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { smartPhone: true },
    });
  }

  async update(
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductWithSmartPhone> {
    return this.prisma.product.update({
      where: { id },
      data: {
        title: dto.title,
        sourceUrl: dto.sourceUrl,
        price: dto.price,
        description: dto.description,
        color: dto.color,
        brand: dto.brand,
      },
      include: { smartPhone: true },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
