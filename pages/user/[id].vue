<template>
  <div class="p-edit-user container">
    <Header title="Edit user">      
      <Button label="Back to list" @click="$router.push('/')" />
    </Header>    
    <FormUser :default-value="form" @submit:forms="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/UserStore'
import FormUser from '@/components/forms/FormUser.vue'
import Button from '@/components/Button.vue';
import type { User } from '@/types/User';

export default defineComponent({
  name: 'PageEdit',
  components: {
    FormUser,
    Button,
  },
  async setup() {
    useHead({ title: 'User - Edit' })
    const { params } = useRoute()
    const userStore = useUserStore()
    await useAsyncData(() => userStore.getUserByd(params.id as string).then(() => true))
    return {
      form: userStore.$state.user
    }
  },
  methods: {
    ...mapActions(useUserStore, ['updateRegister']),
    handleSubmit (value: User) {
      this.updateRegister((this.form.id as string), value, '/')
    }
  }
})
</script>

<style>

</style>