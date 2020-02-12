import { ProductService } from './product.service';
import { DbService } from '@db/db.service';

const testProduct = {
  name: 'banana',
  price: 12,
}

describe('[PRODUCT]', () => {
  let productService: ProductService;
  let productId: string;

  beforeAll(async () => {
    const dbService = new DbService()
    productService = new ProductService(dbService);
  })

  describe('[POST /product]', () => {
    it ('should create product', async () => {
      const product = await productService.create(testProduct);
      expect(product).toHaveProperty('id');
      productId = product.id;
      expect(product).toHaveProperty('name');
      expect(product.name).toBe(testProduct.name);
      expect(product).toHaveProperty('price');
      expect(product.price).toBe(testProduct.price);
    })
  })

  describe('[GET /product]', () => {
    it('should return product', async () => {
      const product = await productService.findOne(productId);
      expect(product).toHaveProperty('id');
      expect(product.idg).toBe(productId);
      expect(product).toHaveProperty('name');
      expect(product.name).toBe(testProduct.name);
      expect(product).toHaveProperty('price');
      expect(product.price).toBe(testProduct.price);
    })
  })


})