import { expect } from 'playwright/test';
import { test } from '../../fixtures/ApiFixtures';
import { ProductAssertions } from '../assertions/ProductAssertions';
import { Endpoints, InvalidEndpoints } from '../../constants/endpoints/Endpoints';

test.describe('Products API', () => {
  test(
    'Should return 200, all products',
    { tag: ['@Positive', '@Product', '@API'] },
    async ({ clientManager }) => {
      const { responseBody } = await clientManager.productClient.getAllProducts();
      ProductAssertions.productsIsArray(responseBody);
    }
  );
  test(
    'Should return 400, invalid url',
    { tag: ['@Negative', '@Product', '@API'] },
    async ({ clientManager }) => {
      const { response } = await clientManager.productClient.getAllProducts({
        expectedStatus: 404,
        invalidUrl: InvalidEndpoints.InvalidProducts
      });
      const text = await response.text();
      ProductAssertions.productsUrlIsIncorrect(text);
    }
  );

  test(
    'Should return 200, single product',
    { tag: ['@Positive', '@Product', '@API'] },
    async ({ clientManager, randomProductID }) => {
      const { responseBody } = await clientManager.productClient.getProductById(randomProductID);
      ProductAssertions.productFieldsToBeDefined(responseBody);
    }
  );
});
