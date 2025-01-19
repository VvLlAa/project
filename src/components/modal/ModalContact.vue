<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { useModalStore } from '@/stores/modalStore';
import { ref, watch } from 'vue'
import type { FormInput, User, UserError } from '@/shared/types'
import {  validateForm } from '@/shared/utils/form/formUtils'
import { useContactsStore } from '@/stores/contactsStore'
import ButtonB from '@/shared/components/ui/ButtonB.vue'
import ButtonDelete from '@/shared/components/ui/ButtonDelete.vue'

const ModalStore = useModalStore();
const ContactsStore = useContactsStore();

const form = ref<FormInput>({
  name: '',
  email: '',
  phone: ''
});

const errorsForm = ref<UserError>({
  name: false,
  email: false,
  phone: false
});

const changeCardDetails = async (card : User) => {
  errorsForm.value = validateForm(form.value)
  const isValid : boolean = Object.values(errorsForm.value).every(value => value === false);
  const editingCard = ContactsStore.contacts.find(item => item.id === card.id) as User;
  if(isValid && editingCard) {
    editingCard.name = form.value.name;
    editingCard.email = form.value.email;
    editingCard.phone = form.value.phone;
    ModalStore.modal.isActive = false;
    localStorage.setItem('contactsStore', JSON.stringify(ContactsStore.contacts));
  }
};

const deleteCardDetails = (card : User) => {
  ContactsStore.contacts = ContactsStore.contacts.filter(item => item.id !== card.id);
  ModalStore.modal.isActive = false;
  localStorage.setItem('contactsStore', JSON.stringify(ContactsStore.contacts));
};

const clearError = (field: keyof UserError) => {
  errorsForm.value[field] = false;
};

watch(
  () => ModalStore.modal.isActive,
  () => {
    if(ModalStore.modal.content) {
      form.value.name = ModalStore.modal.content.name;
      form.value.email = ModalStore.modal.content.email;
      form.value.phone = ModalStore.modal.content.phone;
    }
  }
)

defineExpose({
  deleteCardDetails
})
</script>

<template>
  <Dialog
    v-model:visible="ModalStore.modal.isActive"
    header="Edit Profile"
    :style="{ width: '25rem' }"
    :modal="true"
    :draggable="false"
  >
    <div class="modal-flex" v-for="field in ModalStore.fieldsInput" :key="field.id">
      <label :for="field.type" class="font-semibold w-24">{{field.label}}</label>
      <component
        :is="field.component"
        :class="{'spelling-error spelling-error-border': errorsForm[field.id]}"
        :id="field.type"
        :type="field.type || null"
        :mask="field.mask || null"
        class="flex-auto"
        autocomplete="off"
        v-model="form[field.id]"
        @input="clearError(field.id)"
      />
    </div>
    <div class="modal-contact__btns">
      <ButtonDelete
        type="button"
        label="Save"
        @click="deleteCardDetails(ModalStore.modal.content as User)"
      >
        Delete
      </ButtonDelete>

      <ButtonB
        type="button"
        label="Save"
        @click="changeCardDetails(ModalStore.modal.content as User)"
      >
        Save
      </ButtonB>
    </div>
    <span class="test-animation" ></span>
  </Dialog>
</template>

<style >
.form-contact {
  overflow: hidden;
}

.test-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border: 100px solid rgb(42, 169, 124, 0.02);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 1s ease-in-out;
  z-index: -1;
}

@keyframes grow {
  0% {
    width: 200px;
    height: 200px;
  }
  100% {
    width: 600px;
    height: 600px;
  }
}

.animate {
  animation: grow 1s ease-in-out forwards;
}

.spelling-error-border {
  border: 1px solid red !important;
}

.p-dialog .p-dialog-content {
  display: flex ;
  gap: 10px ;
  flex-direction: column;
}

.modal-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-contact__btns {
  display: flex;
  justify-content: space-between;
}

</style>
