<script setup lang="ts">
import { type User, type UserPosition } from '@/shared/types'
import { useModalStore } from '@/stores/modalStore';
import { ref } from 'vue'

const ModalStore = useModalStore();
const props = defineProps<{
  card: User
}>();

const emit = defineEmits(['changeCardPosition']);
const movingCard = ref<boolean>(false);

const getCardMouseDown = (event: MouseEvent, id :number) => {
  if(id) {
    movingCard.value = true;
    window.addEventListener('mousemove', cardForMoving);
    window.addEventListener('mouseup', getCardMouseUp);
  }
};

const getCardMouseUp = () => {
  movingCard.value = false;
  window.removeEventListener('mousemove', cardForMoving);
  window.removeEventListener('mouseup', getCardMouseUp);
};

const cardForMoving = (event : MouseEvent) => {
  if(movingCard.value) {
    const position : UserPosition = {
      x: event.clientX - 15,
      y: event.clientY - 15,
    }
    emit('changeCardPosition', props.card.id, position);
  }
}

defineExpose({
  movingCard,
  getCardMouseDown,
  getCardMouseUp
})

</script>

<template>
  <div
    class="card-contact"
    @mousemove="cardForMoving"
    :style="{
        position: 'absolute' ,
        top: props.card.position.y + 'px' ,
        left: props.card.position.x + 'px',
    }"
  >
    <i
      @mousedown="props.card.id !== null && getCardMouseDown($event, props.card.id)"
      class="pi pi-align-justify icon"
      style="font-size: 1.4rem"
    />
    <i
      @click="ModalStore.openModal(props.card)"
      class="pi pi-pen-to-square icon-square"
      style="font-size: 1.4rem"
    />
    <div
      class="card-content"
      :class="props.card.id"
    >
      <span class="test1"></span>
      <div>
        Name: {{props.card.name}}
      </div>
      <div>
        Email: {{props.card.email}}
      </div>
      <div>
        Phone: {{props.card.phone}}
      </div>
    </div>
  </div>
</template>

<style scoped>


.card-contact {
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.card-contact {
  position: relative;
  font-size: 16px;
  line-height: 1.4;
  white-space: nowrap;
  background-color: #002d31;
  border-radius: 12px;
}

.icon {
  position: absolute;
  cursor: grab;
  left: 0;
  top: 0;
}

.icon-square {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
}
</style>
