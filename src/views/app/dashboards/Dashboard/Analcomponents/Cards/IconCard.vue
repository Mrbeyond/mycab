<template>
  <div>
    <b-card class="mb-4 text-center cont shadow">
     <!-- <img :src="img" style="height:80px;width:60% !important;" /> -->
     <i :class="icon"/>
      <p class="card-text font-weight-semibold mb-0">{{ title }}</p>
      <p class="lead text-center">{{ value }}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: 'icon-card-title' },
    icon: { type: String, default: 'iconsminds-clock' },
    // img: { type: String, default: '/assets/img/uploads/car.jfif' },
    value: { type: Number, default: 0 }
  }
}
</script>
<style scoped>
.cont{
border-radius:20px;
}
</style>
