import { type FormInput } from '@/shared/types'
import { nextTick } from 'vue'

export const validateForm = (formData : FormInput) => {
  return {
    name: !formData.name.trim(),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: formData.phone.length !== 14
  }
}
