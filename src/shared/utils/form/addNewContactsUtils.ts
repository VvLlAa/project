import { useContactsStore } from '@/stores/contactsStore';
import { type FormInput, type User } from '@/shared/types'

export const addNewContact = (form : FormInput, store = useContactsStore()) => {
  const newContact : User  = {
    id: Date.now(),
    name: form.name,
    email: form.email,
    phone: form.phone,
    position: {
      x: 500,
      y: 20,
    }
  }
  store.contacts.push(newContact);
  localStorage.setItem('contactsStore',  JSON.stringify(store.contacts))
}

export const cleaningInputs = (form : FormInput) => {
  form.name = '';
  form.email = '';
  form.phone = '';
};
