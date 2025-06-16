import { ClientManager } from '../api/clients/ClientManager';
import { Product } from '../api/types/product';

export type Fixtures = {
  clientManager: ClientManager;
  randomProduct: Product;
  randomProductID: number;
};
