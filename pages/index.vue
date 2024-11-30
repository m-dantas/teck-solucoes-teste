<template>
    <div class="p-index container">
        <div class="header">
            <h1 class="title">Users</h1>
            <Button label="Add user" />
        </div>
        <div class="search">
            <InputCustom 
                label="Filter"
                name="search-user"
                type="search"
                id="search-user"
            />
        </div>
        
        <div class="list">
            <Card :user="{ name: 'Mauricio Correia Dantas', cpf: '490.849.598-09', username: 'mdantas', email: 'mauricio.dantascp@gmail.com', group: 'admin' }" />
            <Card :user="{ name: 'Mauricio Dantas', cpf: '490.849.598-09', username: 'mdantas', email: 'mauricio.dantascp@gmail.com', group: 'admin' }" />
        </div>
    </div>
</template>

<script lang="ts">

export default defineComponent({
    name: 'IndexPage',
    setup () {
        useHead({ title: 'Users' })
    }
})
</script>

<style scoped>
.p-index {
    & .header {
        display: flex;
        justify-content: space-between;
        
        & .title {
            font-size: 32px;
            font-weight: 500;
        }
    }
    
    & .list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
    }

    & .header, .search, .list {
        margin-bottom: 32px;
    }

    @media (min-width: 1024px) {
        & .list {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (min-width: 1279px) {
        & .list {
            grid-template-columns: repeat(5, 1fr);
        }
    }    
}


</style>
  