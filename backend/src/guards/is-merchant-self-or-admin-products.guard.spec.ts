import { IsMerchantSelfOrAdminProductsGuard } from './is-merchant-self-or-admin-products.guard';

describe('IsMerchantSelfOrAdminProductsGuard', () => {
  it('should be defined', () => {
    expect(new IsMerchantSelfOrAdminProductsGuard()).toBeDefined();
  });
});
