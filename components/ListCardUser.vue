<template>
  <Card 
    :key="'list-user-item' + user.id" 
    v-for="user in users" 
    :primary-text="user.name"
    :secondary-text="handleMaskCpf(user.cpf)"
    :had-action="true" 
    @main="handleToDetails((user.id as string))"
    @action="() => $emit('submit:remove', user.id)"
  >
    <template #information>
      <div class="primary">{{ user.name }}</div>
      <div style="margin-top: 8px;">
        <div class="secondary">CPF: {{ handleMaskCpf(user.cpf) }}</div>
        <div class="secondary">Username: {{ user.username }}</div>
        <div class="secondary">Email: {{ user.email }}</div>
        <div class="secondary">Group: {{ user.group }}</div>
      </div>
    </template>
    <template #action>
      <IconDelete />
    </template>
  </Card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { User } from '~/types/User';
import utilsCpf from '@/utils/cpf'
import IconDelete from '@/components/icons/Delete.vue';

export default defineComponent({
  name: 'ListCardUser',
  components: {
    IconDelete
  },
  props: {
    users: {
      type: Array as PropType<Array<User>>,
      required: true
    }
  },
  emits: ['submit:remove'],
  methods: {    
    handleToDetails(id: string) {
      this.$router.push(`/user/${id}`)
    },
    handleMaskCpf(cpf: string): string {
      return utilsCpf.mask(cpf)
    }
  }
})
</script>

<style scoped>
.primary {
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
  line-height: normal;
}

.secondary {
  font-size: 14px;
  font-weight: 400;
}

.primary, .secondary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
  width: 270px;
}
</style>