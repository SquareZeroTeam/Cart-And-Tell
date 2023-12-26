import { IsEmailVerifiedGuard } from './is-email-verified.guard';

describe('IsEmailVerifiedGuard', () => {
  it('should be defined', () => {
    expect(new IsEmailVerifiedGuard()).toBeDefined();
  });
});
