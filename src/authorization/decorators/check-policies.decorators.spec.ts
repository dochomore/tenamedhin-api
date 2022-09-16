import { RequirePolicies } from './check-policies.decorators';

describe('CheckPoliciesDecorators', () => {
  it('should be defined', () => {
    expect(RequirePolicies()).toBeDefined();
  });
});
