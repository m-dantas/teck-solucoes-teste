<template>
  <div class="input-custom">
    <label class="name-field" :for="id">{{ label }}</label>
    <input
      class="field"
      v-model="input"
      v-maska="mask"
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
import type { PropType } from 'vue';
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
    validator: {
      type: Object as PropType<{ hasValidator: boolean, validator: Function }>,
      required: false,
      default: () => {
        return {
          hasValidator: false,
          validator: () => true
        }
      }
    },
    mask: {
      type: String,
      required: false,
      default: ''
    }
  },  
  data() {
    return {
      input: '',
    }
  },
  computed: {
    isValid () {
      if (this.validator.hasValidator) {
        const valid = this.validator.validator(this.input)
        valid ? this.$emit('value', this.input) : this.$emit('clear')
        return valid
      } else {
        this.$emit('value', this.input)
        return true
      }
      
    }
  },
  methods: {
    sendValue (value: string) {
      this.$emit('value', value)
    },
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