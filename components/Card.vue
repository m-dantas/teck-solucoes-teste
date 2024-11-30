<template>
   <div class="card">
        <div class="information">
            <div class="primary">{{ user.name }}</div>
            <div class="secondary">{{ user.cpf }}</div>
        </div>
        <div class="action">
            <Eye />
        </div>
   </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { User } from '~/types/User';
import Eye from '@/components/icons/Eye.vue'

export default defineComponent({
    components: {
        Eye
    },
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
            default: () => {}
        } 
    }
})
</script>

<style scoped>
.card {
    width: 100%;
    background-color: var(--primary);
    padding: 16px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--font-color);
    transition: box-shadow 0.3s ease;
    box-shadow: 1px 1px 2px #445b44;
    
    &:hover {
        cursor: pointer;
        box-shadow: 3px 3px 9px #445b44;
    }

    & .information {
        
        .primary {
            font-weight: 500;
            white-space: nowrap;        /* Garante que o texto fique em uma única linha */
            overflow: hidden;           /* Oculta o texto que ultrapassa o limite do elemento */
            text-overflow: ellipsis;    /* Adiciona os "..." ao final */
            width: 160px;  
        }   
        
        .secondary {
            font-size: 12px;
            font-weight: 300;
        }
    }

    & .action {
        svg {
            fill: #162d16;
        }
    }
}
</style>