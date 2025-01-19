import { describe, it, expect } from 'vitest'
import { validateForm } from '@/shared/utils/form/formUtils'
import { type FormInput } from '@/shared/types/User'

describe('FormContact.vue', () => {
  it('should return true for invalid input fields', async () => {
    const invalidUser: FormInput = {
      name: '',
      email: '',
      phone: '',
    };
    const result = validateForm(invalidUser);
    expect(result.name).toBe(true);
    expect(result.email).toBe(true);
    expect(result.phone).toBe(true);
  });
  it('should return false if all fields are filled in correctly', async () => {
    const invalidUser: FormInput = {
      name: 'Test',
      email: 'test@mail.com',
      phone: '(999)-999-9999',
    };
    const result = validateForm(invalidUser);
    expect(result.name).toBe(false);
    expect(result.email).toBe(false);
    expect(result.phone).toBe(false);
  });
});
