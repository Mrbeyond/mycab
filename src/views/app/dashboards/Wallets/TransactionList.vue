<template>
<b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
      <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`/dashboard/wallets/transaction`" class="w-15 w-sm-100">
                <p class="list-item-heading mb-0 truncate">{{data.balance}}</p>
            </router-link>
           <!-- <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.card_no}}</p> -->
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.post_paid_balance}}</p>
            <!-- <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.createdAt}}</p> -->
            <!-- <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.updatedAt}}</p>
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.accounts}}</p>
            <div class="w-15 w-sm-100">
                <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
            </div> -->
        </div>
        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />
        </div>
    </div>
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
