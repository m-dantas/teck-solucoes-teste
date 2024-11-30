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
import FormUser from '~/components/forms/FormUser.vue';

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
  watch: {
    users () {
      setTimeout(() => this.$router.push('/'), 500)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['createNewRegister']),
  }
})
</script>

<style>

</style>