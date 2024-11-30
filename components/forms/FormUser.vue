<template>
  <form @submit.prevent="handleSubmit">
    <InputCustom 
      name="name" 
      id="form-user-name" 
      type="text" 
      label="Nome" 
      :validator="spaceValidator" 
      :required="true"
      @clear="getInputValues('name', '')" 
      @value="event => getInputValues('name', event)"
    />
    <InputCustom 
      name="cpf" 
      id="form-user-cpf" 
      type="text" 
      mask="###.###.###-##" 
      label="CPF" 
      :validator="cpfValidator" 
      :required="true"
      @clear="getInputValues('email', '')" 
      @value="event => getInputValues('cpf', event)"
    />
    <InputCustom 
      name="username" 
      id="form-user-username" 
      type="text" 
      label="Username" 
      :validator="spaceValidator" 
      :required="true"
      @clear="getInputValues('username', '')" 
      @value="event => getInputValues('username', event)"
    />
    <InputCustom 
      name="email" 
      id="form-user-email" 
      type="email" 
      label="E-mail" 
      :required="true"
      :validator="emailValidator"
      @clear="getInputValues('email', '')" 
      @value="event => getInputValues('email', event)"
    />
    <InputCustom 
      name="group" 
      id="form-user-group" 
      type="text" 
      label="Grupo" 
      :validator="spaceValidator" 
      :required="true"
      @clear="getInputValues('group', '')" 
      @value="event => getInputValues('group', event)"
    />
    <div class="actions">
      <Button label="Cancelar"></Button>
      <Button type="submit" label="Salvar" :disabled="!formsValid"></Button>
    </div>
  </form>
</template>

<script lang="ts">
import utilsCpf from '~/utils/cpf'
export default defineComponent({
  name: 'FormUser',
  data() {
    return {
      forms: {
        name: '',
        cpf: '',
        username: '',
        email: '',
        group: '',
      }
    }
  },
  props: {},
  computed: {
    cpfValidator () {
      return {
        hasValidator: true,
        validator: utilsCpf.validation
      }
    },
    spaceValidator () {
      return {
        hasValidator: true,
        validator: (value: string) => !value.startsWith(' ')
      }
    },
    emailValidator () {
      return {
        hasValidator: true,
        validator: (value: string) => RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)
      }
    },
    formsValid () {
      return Object.values(this.forms).every(input => input !== '')
    }
  },
  methods: {
    handleSubmit () {
      this.formsValid && this.$emit('submit:forms', this.forms)
    },
    getInputValues (field: 'name' | 'cpf'  | 'username' | 'email' | 'group', value: string) {
      this.$data.forms[field] = value
    }
  }
})
</script>

<style>

</style>