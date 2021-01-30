<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="position-relative">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
            <img :src="data.img" v-if="data.img" class="card-img-top" style="height:200px;text-align:center;" alt="No image" />
          
        </router-link>
        <!-- <b-badge pill :variant="data.statusColor" class="position-absolute badge-top-left">{{ data.status }}</b-badge> -->
    </div>
    <b-card-body>
            <b-row >
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0 float-right" />
            </b-row>
            <b-row >
              <span> Name:</span> <span  class="ml-3">{{data.first_name}} {{data.last_name}}</span>
            </b-row>
             <b-row  >
                <span>Agent Type:</span> <span class="ml-3">{{data.email}}</span>
             </b-row>
             <b-row  >
                <span> Garage/Port:</span> <span class="ml-3">{{data.phone}}</span>
             </b-row>
             <b-row >
                <span> Phone:</span><span class="ml-3">{{data.admin_type_id}}</span>
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
