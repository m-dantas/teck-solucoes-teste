<template>
  <div class="p-new-user container">
    <Header title="New user">      
      <Button label="Back to list" @click="$router.go(-1)" />
    </Header>
    <FormUser @submit:forms="createNewRegister" />
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import FormUser from '@/components/forms/FormUser.vue';
import type { User } from '@/types/User';

export default defineComponent({
  name: 'PageRegister',
  components: {
    FormUser
  },
  setup() {
    useHead({
      title: 'User - register'
    })
  },
  computed: {
    ...mapState(useUserStore, ['users'])
  },
  methods: {
    ...mapActions(useUserStore, ['createNewRegister']),
    handleSubmit (body: User) {
      this.createNewRegister(body, '/')
    }
  },
})
</script>

<style>

</style>