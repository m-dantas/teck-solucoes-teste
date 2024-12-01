<template>
  <div class="p-index container">
    <Header title="Users">
      <Button label="Add user" @click="goTo('/user/register')" />
    </Header>
    <div class="search">
      <InputCustom label="Filter" name="search-user" type="search" id="search-input-user" placeholder="Type here"
        :is-valid="true" :default-value="inputSearch" @value="getInputSearchValue" />
    </div>

    <template v-if="users.length > 0">
      <div class="list">
        <ListCardUser :users="usersWithFilter" @submit:remove="handleConfirmationModalDelete" />
      </div>
    </template>
    <template v-else>
      <div class="info">
        <h2>No users</h2>
      </div>
    </template>

    <Modal :show="showModal" @close="showModal = false">
      <div class="text">
        Deseja excluir esse usuário?
      </div>
      <div class="actions">
        <Button label="Confirmar" @click="handleDeleteUser" />
        <Button label="Cancelar" :is-secondary="true" @click="[forDeleteId = '', showModal = false]" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { mapActions, mapState } from 'pinia';

export default defineComponent({
  name: 'PageIndex',
  async setup() {
    useHead({ title: 'Users' })
    const userStore = useUserStore()
    await useAsyncData(() => userStore.getListUser().then(() => true))
  },
  data() {
    return {
      inputSearch: '',
      forDeleteId: '',
      showModal: false
    }
  },
  computed: {
    ...mapState(useUserStore, {
      users: 'users',
    }),
    usersWithFilter() {
      return this.users.filter(user => user.name.toLowerCase().startsWith(this.inputSearch.toLowerCase()))
    }
  },
  methods: {
    ...mapActions(useUserStore, ['deleteRegister']),
    getInputSearchValue(value: string) {
      this.inputSearch = value
    },
    goTo(route: string) {
      this.$nuxt.$router.push(route)
    },
    handleConfirmationModalDelete(id: string) {
      this.forDeleteId = id
      this.showModal = true
    },
    async handleDeleteUser() {
      await this.deleteRegister(this.forDeleteId)
      this.showModal = false
      this.forDeleteId = ''
      this.inputSearch = ''
    },
  }
})
</script>

<style scoped>
.p-index {
  .list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .search,
  .list {
    margin-bottom: 32px;
  }

  .info {
    background-color: #3d5c3d;
    border-radius: 5px;
    color: #fff;
    padding: 24px;
    text-align: center;
    width: 100%;

    h1 {
      margin: 0;
    }
  }

  @media (min-width: 1024px) {
    .list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1279px) {
    .list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.text {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
}
</style>