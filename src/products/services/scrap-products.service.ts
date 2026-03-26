import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ScrapProductDto,
  ScrapProductSchema,
} from '../schemas/scrap-product.schema';
import axios from 'axios';

@Injectable()
export class ScrapProductsService {
  async execute(url: string): Promise<ScrapProductDto> {
    console.log('[SERVICE] Enviando para o Scrapper:', url);

    try {
      const response = await axios.post<ScrapProductDto>(
        `${process.env.SCRAPPER_URL}/scrap`,
        { url },
        {
          timeout: 10000,
        },
      );

      console.log('[SERVICE] Status do Scrapper:', response.status);

      const parsed = ScrapProductSchema.parse(response.data);

      console.log('[SERVICE] Resposta do Scrapper:', parsed);

      return parsed;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('[SERVICE] Erro Axios:', error.code, error.message);

        if (error.code === 'ECONNABORTED') {
          throw new InternalServerErrorException(
            'Tempo limite excedido ao consultar o scrapper',
          );
        }
      }

      throw new InternalServerErrorException(
        'Erro ao comunicar com o scrapper',
      );
    }
  }
}
