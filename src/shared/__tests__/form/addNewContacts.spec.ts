import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia';
import { addNewContact, cleaningInputs } from '@/shared/utils/form/addNewContactsUtils'
import { useContactsStore } from '@/stores/contactsStore'
import type { User } from '@/shared/types'

describe('FormContact.vue', () => {
  let store: ReturnType<typeof useContactsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useContactsStore();
  });

  const newContact: User = {
    id: Date.now(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '999-999-9999',
    position: {
      x: 50,
      y: 50,
    }
  };

  it('should return the added array', () => {
    const saveBeforeAdding : number = store.contacts.length;
    addNewContact(newContact, store);
    expect(store.contacts.length).toBeGreaterThan(saveBeforeAdding);
  });
  it('should return empty object strings', () => {
    cleaningInputs(newContact)
    expect(newContact.name).toBe('');
    expect(newContact.email).toBe('');
    expect(newContact.phone).toBe('');
  });
});
