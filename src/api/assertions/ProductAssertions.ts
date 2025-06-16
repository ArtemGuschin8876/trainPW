import { expect } from 'playwright/test';
import { Product } from '../types/product';
import { Logger } from '../../utils/logger';
import { Errors } from '../../constants/Errors';

export class ProductAssertions {
  private static logger = new Logger('ProductAssertions');

  static productFieldsToBeDefined(product: Product): void {
    for (const [key, value] of Object.entries(product)) {
      expect(value, `Check that product.${key} is defined`).toBeDefined();
    }
    for (const [key, value] of Object.entries(product.rating)) {
      expect(value, `Check that product.rating.${key} is defined`).toBeDefined();
    }
    this.logger.info('All product fields and rating fields are defined');
  }

  static productsIsArray(products: Product[]): void {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    this.logger.info('Products is an array and not empty');
  }

  static productsUrlIsIncorrect(text: string) {
    expect(text).toContain(Errors.CANNOT_GET_PRODUCTS);
    expect(text).toContain('<html>');
  }
}
