<template>
<b-card no-body>
    <b-card-body class="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div class="price-top-part">
            <i class="large-icon simple-icon-wallet'"></i>
            <h5 class=" mb-0 font-weight-semibold color-theme-1 mb-4">
              Wallet Balance
            </h5>
            <div>
              <div class="text-center"><strong>Balance</strong></div>
              <p class="text-large mb-2 text-default">{{data.balance}}</p>
            </div>
            <div>
              <div class="text-center"><strong>Post paid balance</strong></div>
              <p class="text-large mb-2 text-default">{{data.post_paid_balance}}</p>
            </div>
        </div>
    </b-card-body>
</b-card>
</template>

<script>
export default {
    props: ['data']
}
</script>
