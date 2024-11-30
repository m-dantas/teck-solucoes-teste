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
import type { PropType } from 'vue';
import type { User } from '~/types/User';
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
  props: {
    defaultValue: {
      type: Object as PropType<User>,
      required: false,
      default: () => ({
        id: '',
        cpf: '',
        email: '',
        group: '',
        name: '',
        username: ''
      })
    }
  },
  computed: {
    formsValid () {
      const verifyIfAllFieldFill = Object.values(this.forms).every(item => item.isValid)
      if (this.defaultValue.id !== '') {
        const clonedDefaultValue = JSON.parse(JSON.stringify(this.defaultValue));
        delete clonedDefaultValue.id
        const defaultValuesToArray = Object.values(clonedDefaultValue)
        return !Object.values(this.forms).every((item, index) => item.value === defaultValuesToArray[index]) && verifyIfAllFieldFill
      }
      return verifyIfAllFieldFill
    }
  },
  created () {
    if (this.defaultValue.id !== '') {
      this.forms.name.value = this.defaultValue.name
      this.forms.cpf.value = this.defaultValue.cpf
      this.forms.username.value = this.defaultValue.username
      this.forms.email.value = this.defaultValue.email
      this.forms.group.value = this.defaultValue.group
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
      if (value !== '') {
        this.$data.forms[field].value = value
        switch (field) {
          case 'cpf':
            this.$data.forms[field].isValid = utilsCpf.validation(this.$data.forms[field].value) && this.$data.forms[field].value.length === 14
            break;
          case 'email':
            this.$data.forms[field].isValid = this.emailValidator(this.$data.forms[field].value) && this.$data.forms[field].value.length >= 5
            break;
          default:
            this.$data.forms[field].isValid = this.spaceValidator(this.$data.forms[field].value) && this.$data.forms[field].value.length >= 4
            break;
        }
      } else {        
        this.$data.forms[field].isValid = false
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