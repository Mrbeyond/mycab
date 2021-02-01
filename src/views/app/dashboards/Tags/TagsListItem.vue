<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero row">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`?p=${data.id}`" class="w-5 w-sm-100">
<!--                <p class="list-item-heading mb-0 truncate">{{data.id}}</p>-->
             <qr-code
               text="data.system_identifier"
               width="250"
               height="250"
               size="250"
             />
            </router-link>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{data.tag_no}}</p>
            <p class="mb-0 text-muted text-small w-5 w-sm-100">{{new Date(data.createdAt).toDateString()}}</p>
            <div class="w-15 w-sm-100">
                <b-badge pill :variant="data.statusColor">{{data.vehicles.length > 0 ? "Assigned" : "Not Assigned"}}</b-badge>
            </div>
             <div class="w-15 w-sm-100">
                  <b-btn v-b-toggle="data.updatedAt" title="View Vehicles" badge-variant="dark">
                      Vehicles <b-badge variant="primary" rounded-conner>{{data.vehicles.length}}</b-badge></b-btn>
                <!-- <b-badge pill :variant="data.statusColor"  ></b-badge> -->
            </div>
        </div>
<!--        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">-->
<!--            <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />-->
<!--        </div>-->
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
  import QrCode from "../../../../components/QRCode";

export default {
    components:{
      QrCode
  },
    props: ['data', 'selectedItems'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        }
    }
}
</script>
