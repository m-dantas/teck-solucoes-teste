<template>
  <div>
    <slot />
    <Teleport to="body">
      <Alert></Alert>
    </Teleport>
  </div>
</template>

<script lang="ts">
import Alert from '@/components/Alert.vue';

export default defineComponent({
  name: 'default',
  components: {
    Alert
  }
})
</script>
