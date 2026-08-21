// Back

import type {
  ProductBrand,
  ProductCategory,
} from '../../generated/prisma/enums';
import { detectBrand } from './detectBrand';
import { detectCategory } from './detectCategory';
import { detectFamily } from './detectFamily';
import { detectModel } from './detectModel';
import { normalizeTitle } from './normalize-title';

type ProductPreparationInput = {
  title: string;

  brand?: ProductBrand;
  category?: ProductCategory;
  family?: string;
  model?: string;

  ram?: string;
  storage?: string;
  color?: string;
  description?: string;
};

export function prepareProduct<T extends ProductPreparationInput>(dto: T) {
  const title = normalizeTitle(dto.title);

  return {
    ...dto,
    title,
    brand: dto.brand ?? detectBrand(title),
    family: dto.family ?? detectFamily(title),
    category: dto.category ?? detectCategory(title),
    model: dto.model ?? detectModel(title),
  };
}
