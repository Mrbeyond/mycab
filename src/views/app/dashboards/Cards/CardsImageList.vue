<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="position-relative">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
            <img :src="data.img" v-if="data.img" class="card-img-top" style="height:200px" :alt="data.firstname" />
          
        </router-link>
        <b-badge pill :variant="data.statusColor" class="position-absolute badge-top-left">{{ data.status }}</b-badge>
    </div>
    <b-card-body>
            <b-row class="mb-3">
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0 float-right" />
            </b-row>
            <b-row class="mb-3">
               <span right  class="col-12">{{data.card_no}}</span>
            </b-row>
             <b-row class="mb-3" >
                <span class="col-12">{{data.system_identifier}}</span>
             </b-row>
             <b-row  class="mb-3">
                 <span class="col-12">{{data.createdAt}}</span>
             </b-row>
             <b-row class="mb-3">
                <span  class="col-12">{{data.accounts}}</span>
             </b-row>
    </b-card-body>
</b-card>
</template>

<script>
export default {
    props: ['data', 'selectedItems'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        }
    }
}
</script>
