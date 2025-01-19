import type { FormInput, User } from '@/shared/types/User'
import type { Component } from 'vue'

export interface ModalType {
  content: User | null;
  isActive: boolean;
}

export interface FieldsType {
  id: keyof FormInput;
  label: string;
  errorLabel: string;
  type: string;
  mask?: string;
  component: Component;
}
