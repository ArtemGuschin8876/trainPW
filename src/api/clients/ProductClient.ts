import { APIRequestContext, APIResponse } from 'playwright/test';
import { Endpoints } from '../../constants/endpoints/Endpoints';
import { Logger } from '../../utils/logger';
import { Product } from '../types/product';
import { sendApiRequest } from '../../helpers/APIHelper';

export class ProductClient {
  private logger = new Logger('ProductClient');
  constructor(private request: APIRequestContext) {}

  async getAllProducts(options?: { expectedStatus?: number; invalidUrl?: string }) {
    this.logger.info('Fetching all products');
    return await sendApiRequest<Product[]>(
      this.request,
      'GET',
      options?.invalidUrl ?? Endpoints.PRODUCTS,
      options
    );
  }

  async getProductById(productId: number, options?: { expectedStatus?: number }) {
    this.logger.info(`Fetching product with ID: ${productId}`);
    return await sendApiRequest<Product>(
      this.request,
      'GET',
      `${Endpoints.PRODUCTS}${productId}`,
      options
    );
  }
}
