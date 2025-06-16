import { APIRequest, APIRequestContext } from 'playwright/test';
import { ProductClient } from './ProductClient';

export class ClientManager {
  readonly productClient: ProductClient;

  constructor(request: APIRequestContext) {
    this.productClient = new ProductClient(request);
  }
}
