<template>
  <!-- <Transition :duration="550" name="nested">
    
  </Transition> -->
  <Teleport to="body">
    <template v-if="show">
      <div class="modal">
        <slot></slot>
      </div>
      <div class="bg" @click="$emit('close')"></div>
    </template>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close']
})
</script>

<style scoped>
.modal {
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  bottom: 0;
  box-sizing: border-box;
  padding-top: 32px;
  padding: 16px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 2;

  @media (min-width: 1024px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    height: fit-content;
    border-radius: 5px;
  }
}

.bg {
  background-color: var(--primary);
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>