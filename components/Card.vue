<template>
   <div class="card">
        <div class="information">
            <div class="primary">{{ user.name }}</div>
            <div class="secondary">{{ cpf }}</div>
        </div>
        <div class="action">
            <Eye />
        </div>
   </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { User } from '@/types/User';
import utilsCpf from '@/utils/cpf'
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
    },
    computed: {
        cpf (): string {
            return utilsCpf.mask(this.user.cpf)
        }
    }
})
</script>

<style scoped>
.card {
    align-items: center;
    background-color: #ada;
    border-radius: 5px;
    box-shadow: 1px 1px 2px #445b44;
    color: var(--font-color);
    display: flex;
    justify-content: space-between;
    padding: 16px;
    transition: box-shadow 0.3s ease;
    width: 100%;
    
    &:hover {
        box-shadow: 3px 3px 9px #445b44;
        cursor: pointer;
    }

    .information {
        
        .primary {
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis; 
            white-space: nowrap;
            width: 160px;  
        }   
        
        .secondary {
            font-size: 12px;
            font-weight: 300;
        }
    }

    .action {
        svg {
            fill: #162d16;
        }
    }
}
</style>