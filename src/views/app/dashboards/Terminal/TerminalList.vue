<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`?p=${data.id}`" class="w-5 w-sm-100">
                <p class="list-item-heading mb-0 truncate">{{data.state_id}}</p>
            </router-link>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.tag_no}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.vehicles}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">
              {{Timest(data.createdAt)}}
            </p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{Timest(data.updatedAt)}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.status}}</p>
            <div class="w-15 w-sm-100">
                <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
            </div>
        </div>
        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />
        </div>
    </div>
</b-card>
</template>

<script>
import { LUX_ZONE } from '../../../../constants/formKey'
export default {
    props: ['data', 'selectedItems'],
    data: ()=>({
      des: Timest(5)
    }),
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        },

      Timest(val){
        return LUX_ZONE(val)
      }
    },
    computed: {
      fest(d){
        return d
      }
    }

}
</script>
