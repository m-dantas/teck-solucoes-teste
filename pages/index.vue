<template>
  <div class="p-index container">
    <Header title="Users">      
      <Button label="Add user" @click="goTo('/user/register')" />
    </Header>
    <div class="search">
      <InputCustom label="Filter" name="search-user" type="search" id="search-input-user" placeholder="Type here" @value="getInputSearchValue" />
    </div>

    <template v-if="users.length > 0">
      <div class="list">
        <Card :key="'list-user-item' + user.id" v-for="user in usersWithFilter" :user="user"
          @click="goTo(`/user/${user.id}`)" />
      </div>
    </template>
    <template v-else>
      <div class="info">
        <h2>No users</h2>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { mapActions, mapState } from 'pinia';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    useHead({ title: 'Users' })
  },
  data() {
    return {
      inputSearch: ''
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
  async beforeMount() {
    await this.getListUser()
  },
  methods: {
    ...mapActions(useUserStore, ['getListUser']),
    getInputSearchValue(value: string) {
      this.inputSearch = value
    },
    goTo(route: string) {
      this.$nuxt.$router.push(route)
    }
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

    h1 { margin: 0;}
  }

  @media (min-width: 1024px) {
    .list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1279px) {
    .list {
      grid-template-columns: repeat(5, 1fr);
    }
  }

}
</style>