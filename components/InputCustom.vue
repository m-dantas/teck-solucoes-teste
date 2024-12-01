<template>
  <div class="input-custom">
    <label class="name-field" :for="id">{{ label }}</label>
    <input
      class="field"
      v-maska="mask"
      v-model="input"
      :type="type"
      :name="name"
      :id="id"
      :required="required"
      :placeholder="placeholder"
    >
    <span class="field-error-message" v-if="!isValid && input">Input inválida</span>
  </div>
</template>

<script lang="ts">
import { vMaska  } from 'maska/vue'

export default defineComponent({
  name: 'InputCustom',
  directives: {
    maska: vMaska
  },
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    defaultValue: {
      type: String,
      required: false,
      default: ''
    },
    mask: {
      type: String,
      required: false,
      default: ''
    },
    isValid: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['value'],
  data() {
    return {
      input: '',
    }
  },
  watch: {
    defaultValue () {
      this.input = this.defaultValue
    },
    input() {
      this.$emit('value', this.input)
    }
  },
  mounted () {
    this.input = this.defaultValue
  }
})
</script>

<style scoped>
.input-custom {
  margin-bottom: 16px;

  .name-field {
    display: block;
    margin-bottom: 8px;
  }
 
  .field {
    background-color: rgb(214, 233, 214);
    border-radius: 5px;
    border: none;
    font-size: 16px;
    padding: 8px;
    width: 100%;
  }

  .field-error-message {
    display: block;
    font-size: 12px;
    font-weight: bold;
    margin-top: 8px;
  }
}
</style>