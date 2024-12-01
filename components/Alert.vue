<template>
  <Transition :duration="550" name="nested">
    <div v-if="show" class="alert" :class="{ error: isError }">
      {{ message }}
      <div class="close" @click="resetState">
        <Close />
      </div>
    </div>
  </Transition>
  
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia';
import { useAlertStore } from '~/stores/AlertStore';
import Close from '~/components/icons/Close.vue';

export default defineComponent({
  name: 'Alert',
  components: {
    Close,
  },
  computed: {
    ...mapState(useAlertStore, ['message', 'isError', 'show'])
  },
  methods: {
    ...mapActions(useAlertStore, ['resetState'])
  }
})
</script>

<style scoped>
.alert {
  align-items: center;
  background: #7aad7a;
  border-radius: 5px;
  bottom: 15px;
  box-shadow: 10px 10px 8px #3d5c3d;
  color: #fff;
  display: flex;
  justify-content: space-between;
  max-width: fit-content;
  min-width: 300px;
  padding: 16px;
  position: fixed;
  right: 15px;

  &.error {
    background-color: rgb(207, 100, 100);
  }

  .close {
    align-items: center;
    background-color: #cacaca6b;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    height: 35px;
    justify-content: center;
    width: 35px;
    margin-left: 8px;
  }
}

.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>