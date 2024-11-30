<template>
  <button class="custom-button">
    {{ label }}
  </button>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
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
  
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 9px #445b44;
  }
}
</style>