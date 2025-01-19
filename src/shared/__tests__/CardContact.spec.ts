import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import  CardContact  from '../components/card/CardContact.vue'

describe('FormContact.vue', () => {
  const wrapper = mount(CardContact, {
    global: {
      plugins: [createPinia()],
    },
    props: {
      card: {
        id: Date.now(),
        name: 'test',
        email: 'test',
        phone: 'test',
        position: {
          x: 50,
          y: 50,
        }
      },
    },
  });
  it(
    'should check whether the card was clicked ' +
    '&& should check when you moved the card and released the click', () =>
  {
    const mockEvent = new MouseEvent('mousedown');
    expect(wrapper.vm.movingCard).toBe(false);
    wrapper.vm.getCardMouseDown(mockEvent, 1);
    expect(wrapper.vm.movingCard).toBe(true);
    wrapper.vm.getCardMouseUp();
    expect(wrapper.vm.movingCard).toBe(false);
  });
});
