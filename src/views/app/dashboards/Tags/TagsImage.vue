<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="position-relative">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
            <img :src="data.img" v-if="data.img" class="card-img-top" style="height:200px" :alt="data.title" />
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
             <b-row>
             <p>{{data.createdAt}}</p>
             </b-row>
             <b-row>
            <p>{{data.updatedAt}}</p>
             </b-row>
             <v-row>
                 <b-btn v-b-toggle="data.updatedAt" title="View Vehicles" badge-variant="dark">
                 Vehicles <b-badge variant="primary" rounded-conner>{{data.vehicles.length}}</b-badge></b-btn>
             </v-row>
             <b-row>
            <p>{{data.status}}</p>
             </b-row>
             <b-row>
            <b-collapse :id="data.createdAt">
               <div class="p-4 border mt-4">
                  <b-row>
                    <b-colxx xxs="12">
                        <b-card class="mb-4" title="Vehicles">
                            <b-table responsive bordered :items="data.vehicles" />
                        </b-card>
                        </b-colxx>
                </b-row>
                </div>
            </b-collapse>
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
