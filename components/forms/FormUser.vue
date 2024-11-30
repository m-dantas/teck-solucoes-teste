<template>
  <form class="form-user" @submit.prevent="handleSubmit">
    <InputCustom 
      name="name" 
      id="form-user-name" 
      type="text" 
      label="Nome" 
      :required="true"
      :is-valid="forms.name.isValid"
      :default-value="forms.name.value"
      @value="event => getInputValues('name', event)"
    />
    <InputCustom 
      name="cpf" 
      id="form-user-cpf" 
      type="text" 
      mask="###.###.###-##" 
      label="CPF" 
      :required="true"
      :is-valid="forms.cpf.isValid"
      :default-value="forms.cpf.value"
      @value="event => getInputValues('cpf', event)"
    />
    <InputCustom 
      name="username" 
      id="form-user-username" 
      type="text" 
      label="Username" 
      :required="true"
      :is-valid="forms.username.isValid"
      :default-value="forms.username.value"
      @value="event => getInputValues('username', event)"
    />
    <InputCustom 
      name="email" 
      id="form-user-email" 
      type="email" 
      label="E-mail" 
      :required="true"
      :is-valid="forms.email.isValid"
      :default-value="forms.email.value"
      @value="event => getInputValues('email', event)"
    />
    <InputCustom 
      name="group" 
      id="form-user-group" 
      type="text" 
      label="Grupo" 
      :required="true"
      :is-valid="forms.group.isValid"
      :default-value="forms.group.value"
      @value="event => getInputValues('group', event)"
    />
    <div class="actions">
      <Button type="submit" :disabled="!formsValid" label="Salvar"></Button>
      <Button label="Cancelar" :is-secondary="true" @click="$router.push('/')"></Button>
    </div>
  </form>
</template>

<script lang="ts">
import utilsCpf from '@/utils/cpf'
export default defineComponent({
  name: 'FormUser',
  data() {
    return {
      forms: {
        name: {
          value: '',
          isValid: false
        },
        cpf:  {
          value: '',
          isValid: false
        },
        username:  {
          value: '',
          isValid: false
        },
        email: {
          value: '',
          isValid: false
        },
        group:  {
          value: '',
          isValid: false
        },
      }
    }
  },
  emits: ['submit:forms'],
  props: {},
  computed: {
    formsValid () {
      return Object.values(this.forms).every(item => item.value !== '')
    }
  },
  methods: {
    handleSubmit () {
      if (this.formsValid) {
        const body = {
          name: this.forms.name.value,
          cpf: this.forms.cpf.value,
          username: this.forms.username.value,
          email: this.forms.email.value,
          group: this.forms.group.value
        }
        this.$emit('submit:forms', body)
      }      
    },
    getInputValues (field: 'name' | 'cpf'  | 'username' | 'email' | 'group', value: string) {
      this.$data.forms[field].value = value
      console.log(value)
      switch (field) {
        case 'cpf':
          this.$data.forms[field].isValid = utilsCpf.validation(this.$data.forms[field].value)
          break;
        case 'email':
          this.$data.forms[field].isValid = this.emailValidator(this.$data.forms[field].value)
          break;
        default:
          this.$data.forms[field].isValid = this.spaceValidator(this.$data.forms[field].value)
          break;
      }
    },
    spaceValidator (value: string) {
      return !value.startsWith(' ')
    },
    emailValidator (value: string) {
      return RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)
    },
  }
})
</script>

<style scoped>
.form-user {
  width: 100%;

  .actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  @media (min-width: 1024px) {
    .actions {
      flex-direction: row;
    }
  }
}
</style>