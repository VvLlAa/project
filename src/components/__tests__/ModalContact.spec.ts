import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ModalContact from '@/components/modal/ModalContact.vue'
import { useContactsStore } from '@/stores/contactsStore'
import { useModalStore } from '@/stores/modalStore'
import type { User } from '../../shared/types'
import { type ComponentPublicInstance } from 'vue';

describe('FormContact.vue', () => {
  let storeModalStore: ReturnType<typeof useModalStore>;
  let storeContact: ReturnType<typeof useContactsStore>;
  let wrapper: VueWrapper<ComponentPublicInstance<typeof ModalContact>>;

  const userCard : User = {
    id: 1,
    name: 'Test',
    email: 'test@test.com',
    phone: '+7(999)-999-999',
    position: {
      x: 1,
      y: 1,
    }
  }

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia)
    storeContact = useContactsStore();
    storeModalStore = useModalStore();
    wrapper = mount(ModalContact, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it('should remove card user', () => {
    storeContact.contacts = [userCard];
    expect(storeContact.contacts).toHaveLength(1);
    wrapper.vm.deleteCardDetails(userCard);
    expect(storeContact.contacts).toHaveLength(0);
  });
  it('the modal window must be closed after deleting the card', () => {
    storeModalStore.modal.isActive = true;
    expect(storeModalStore.modal.isActive).toBe(true)
    wrapper.vm.deleteCardDetails(userCard);
    expect(storeModalStore.modal.isActive).toBe(false)
  });
});
