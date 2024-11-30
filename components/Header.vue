<template>
  <div class="header">
    <h1 class="title">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  & .title {
    font-size: 32px;
    font-weight: 500;
  }
}
</style>