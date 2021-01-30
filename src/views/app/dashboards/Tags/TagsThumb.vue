<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <router-link :to="`?p=${data.id}`" class="d-flex">
        <img :src="data.img" v-if="data.img" class="list-thumbnail responsive border-0" :alt="data.title" />
    </router-link>
    <div  class="pl-2 d-flex flex-grow-1 min-width-zero row">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`?p=${data.id}`" class="w-5 w-sm-100">
                <p class="list-item-heading mb-0 truncate"> {{data.state_id}}</p>
            </router-link>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.tag_no}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.createdAt}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.updatedAt}}</p>
               <b-btn v-b-toggle="data.updatedAt" title="View Vehicles" badge-variant="dark">
                Vehicles <b-badge variant="primary" rounded-conner>{{data.vehicles.length}}</b-badge></b-btn>

            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.status}}</p>
        </div>
        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />
        </div>
    </div>
    <b-row>
    <b-colxx xxs="12">
        <!-- <b-card class="mb-4" :title="$t('collapse.basic')"> -->
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
        <!-- </b-card> -->
    </b-colxx>
     </b-row>
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
