import { IsMerchantSelfOrAdminGuard } from './is-merchant-self-or-admin.guard';

describe('IsMerchantSelfOrAdminGuard', () => {
  it('should be defined', () => {
    expect(new IsMerchantSelfOrAdminGuard()).toBeDefined();
  });
});
