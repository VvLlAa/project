import { ref, markRaw  } from 'vue'
import { defineStore } from 'pinia'
import type { FieldsType, ModalType, User } from '@/shared/types'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'

export const useModalStore = defineStore('ModalStore', () => {
  const modal = ref<ModalType>({
    content: null,
    isActive: false,
  })

  const fieldsInput : FieldsType[] = ([
    {
      id: 'name',
      label: 'Name',
      errorLabel: 'Enter name',
      type: 'text',
      component: markRaw(InputText),
    },
    {
      id: 'email',
      label: 'Email',
      errorLabel: 'Enter email',
      type: 'email',
      component: markRaw(InputText),
    },
    {
      id: 'phone',
      label: 'Number',
      errorLabel: 'Enter number',
      type: 'phone',
      mask: '(999)-999-9999',
      component: markRaw(InputMask),
    },
  ]);

  const openModal = (card : User) => {
    modal.value.isActive = true;
    if(card) {
      modal.value.content = card;
    }
  };

  return { modal, openModal, fieldsInput }
})
