import { IsUserSelfOrAdminGuard } from './is-user-self-or-admin.guard';

describe('IsUserSelfOrAdminGuard', () => {
  it('should be defined', () => {
    expect(new IsUserSelfOrAdminGuard()).toBeDefined();
  });
});
