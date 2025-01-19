<script setup lang="ts">
import { useContactsStore } from '@/stores/contactsStore'
import CardContact from '@/shared/components/card/CardContact.vue'
import type { User, UserPosition } from '@/shared/types'
import { onMounted } from 'vue'

const ContactsStore = useContactsStore();

const changeCardPosition = (id : number, position : UserPosition) => {
  const updateCard = ContactsStore.contacts.find(card => card.id === id);
  if(updateCard) {
    updateCard.position.x = position.x;
    updateCard.position.y = position.y;
  }
  localStorage.setItem('contactsStore', JSON.stringify(ContactsStore.contacts));
};

onMounted(() => {
  const getLocal = localStorage.getItem('contactsStore') || '[]';
  const parseContacts : User[] = JSON.parse(getLocal);
  if(parseContacts.length > 0) {
    ContactsStore.contacts = parseContacts;
  }
});
</script>

<template>
  <div class="contact-list">
    <div v-for="(card, index) in  ContactsStore.contacts" :key="index">
      <CardContact
        :card="card"
        @changeCardPosition="changeCardPosition"
      />
    </div>
  </div>
</template>

<style scoped>
.contact-list {

}
</style>
