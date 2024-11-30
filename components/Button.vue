<template>
  <button class="custom-button" :class="{ secondary: isSecondary }" :type="type" :disabled="disabled">
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
    },
    isSecondary: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>

<style scoped>
.custom-button {
  background-color: var(--primary);
  border-radius: 5px;
  border: none;
  box-shadow: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  min-width: 100px;
  padding: 8px 16px;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 3px 3px 9px #445b44;
    cursor: pointer;
  }

  &:disabled {
    background-color: #ccc;
    box-shadow: unset;
    cursor: not-allowed;
  }

  &.secondary {
    background-color: var(--secondary);
  }
}
</style>