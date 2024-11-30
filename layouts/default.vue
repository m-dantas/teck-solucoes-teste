<template>
  <div>
    <slot />
    <Alert></Alert>
  </div>
</template>

<script lang="ts">
import Alert from '~/components/Alert.vue';

export default defineComponent({
  name: 'default',
  components: {
    Alert
  }
})
</script>
