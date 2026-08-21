import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { scrapeAmazon } from '../scrapers/amazon.scrapper';
import { detectMarketplace } from '../utils/detectMarketplace';

@Injectable()
export class ScrappersService {
  private readonly logger = new Logger(ScrappersService.name);

  async scrap(url: string) {
    this.logger.log(`Iniciando scraping`);

    const source = detectMarketplace(url);

    switch (source) {
      case 'amazon':
        return scrapeAmazon(url);

      case 'shopee':
        throw new NotImplementedException(
          'Scraper da Shopee ainda não implementado.',
        );

      case 'mercadolivre':
        throw new NotImplementedException(
          'Scraper do Mercado Livre ainda não implementado.',
        );
    }
  }
}
