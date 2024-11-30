<template>
  <button class="custom-button" :type="type" :disabled="disabled">
    {{ label }}
  </button>
</template>

<script lang="ts">
import type { PropType, ButtonHTMLAttributes } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      required: false,
      default: 'button',
      validator: (value: string) => {
        return ['button', 'submit'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>

<style scoped>
.custom-button {
  border: none;
  border-radius: 5px;
  background-color: var(--primary);
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: none;
  transition: box-shadow 0.3s ease;
  min-width: 100px;
  
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 9px #445b44;
  }

  &:disabled {
    cursor: not-allowed;
    box-shadow: unset;
  }
}
</style>