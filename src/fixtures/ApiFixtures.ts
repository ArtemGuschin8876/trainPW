import { test as baseTest } from '@playwright/test';
import { Fixtures } from './Fixtures';
import { ClientManager } from '../api/clients/ClientManager';
import { Product } from '../api/types/product';

export const test = baseTest.extend<Fixtures>({
  clientManager: async ({ request }, use) => {
    const clientManager = new ClientManager(request);
    await use(clientManager);
  },

  randomProduct: async ({ clientManager }, use) => {
    const { responseBody } = await clientManager.productClient.getAllProducts();
    const randomProduct = responseBody[Math.floor(Math.random() * responseBody.length)];
    await use(randomProduct);
  },

  randomProductID: async ({ randomProduct }, use) => {
    await use(randomProduct.id);
  }
});
