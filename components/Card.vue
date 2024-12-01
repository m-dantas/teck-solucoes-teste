<template>
  <div class="card" @click.stop="$emit('main')">
    <div class="information">
      <div class="primary">{{ primaryText }}</div>
      <div class="secondary">{{ secondaryText }}</div>
    </div>
    <div v-if="hadAction" class="action" @click.stop="$emit('action')">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import IconDelete from '@/components/icons/Delete.vue'

export default defineComponent({
  components: {
    IconDelete
  },
  props: {
    primaryText: {
      type: String,
      required: true
    },
    secondaryText: {
      type: String,
      required: false,
      default: ''
    },
    hadAction: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['main', 'action']
})
</script>

<style scoped>
.card {
  align-items: center;
  background-color: #ada;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #445b44;
  color: var(--font-color);
  display: flex;
  justify-content: space-between;
  padding: 16px;
  transition: box-shadow 0.3s ease;
  width: 100%;

  &:hover {
    box-shadow: 3px 3px 9px #445b44;
    cursor: pointer;
  }

  .information {

    .primary {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 160px;
    }

    .secondary {
      font-size: 12px;
      font-weight: 300;
    }
  }

  .action {
    width: 40px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 100%;

    &:hover {
      background-color: #d1cccc;
      transition: background-color 250ms linear;
    }
  }
}
</style>