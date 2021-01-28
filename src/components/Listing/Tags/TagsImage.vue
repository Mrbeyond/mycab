<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="position-relative">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
            <img :src="data.img" class="card-img-top" style="height:200px" :alt="data.title" />
        </router-link>
        <b-badge pill :variant="data.statusColor" class="position-absolute badge-top-left">{{ data.status }}</b-badge>
    </div>
    <b-card-body>
            <b-row>
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />
            </b-row>
            <b-row  >
                <span class="float-right">{{data.tag_no}}</span>
             </b-row>
             <b-row  >
                 <span class="float-right">{{data.vehicles}}</span>
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
