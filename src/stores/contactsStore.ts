import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type User } from '@/shared/types'

export const useContactsStore = defineStore('ContactsStore', () => {
  const contacts = ref<User[]>([]);

  return { contacts }
})
