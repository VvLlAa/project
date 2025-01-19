<script setup lang="ts">
import {  ref } from 'vue'
import { validateForm } from '@/shared/utils/form/formUtils'
import { addNewContact, cleaningInputs } from '@/shared/utils/form/addNewContactsUtils'
import { useModalStore } from '@/stores/modalStore'

import IftaLabel from 'primevue/iftalabel';

import { type FormInput, type UserError } from '@/shared/types/User'
import ButtonB from '@/shared/components/ui/ButtonB.vue'

const ModalStore = useModalStore();

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

const sendForm = async () => {
  errorsForm.value = validateForm(form.value)
  const isValid = Object.values(errorsForm.value).every(value => value === false);
  if(isValid) {
    addNewContact(form.value);
    cleaningInputs(form.value);
  }
};
</script>

<template>

 <form
    class="form-contact"
    @submit.prevent="sendForm"
  >
    <IftaLabel variant="on" v-for="field in ModalStore.fieldsInput" :key="field.id">
      <component
        class="form-contact__input"
        :is="field.component"
        :id="`on_label-` + field.type"
        :invalid="errorsForm[field.id]"
        v-model="form[field.id]"
        :mask="field.mask || null"
      />
      <label
        for="on_label_text"
      >
        {{  field.label  }}
      </label>
    </IftaLabel>
    <ButtonB class="test">Add</ButtonB>
  </form>
</template>

<style >

.form-contact {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #333333;
  background: #121212;
  z-index: 1;
}

.form-contact::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 13%;
  width: 10px;
  height: 100%;
  background-color: #333333;
  z-index: 0;
}

.form-contact .test:hover ~ ::after {
  background-color: #4CAF50; /* Меняем цвет полоски на зелёный */
}

.form-contact .p-iftalabel {
  width: 100%;
}

.form-contact .form-contact__input {
  position: relative;
  width: 100%;
  background-color: #1E1E1E;
  border: 1px solid #333333;
  color: #E0E0E0;
  z-index: 1;
}

.p-iftalabel label{
  z-index: 2;
}

.form-contact .test {
  background-color: #333333;
}

.form-contact .test:hover {
  background-color: var(--color-btn-hover);
}

</style>
