<template>
  <div>
    <b-card class="mb-4 text-center cont shadow">
     <!-- <img :src="img" style="height:80px;width:60% !important;" /> -->
     <i :class="icon"/>
      <p class="card-text font-weight-semibold mb-0">{{ title }}</p>
      <p class="lead text-center">{{is_currency ? '&#8358;' : ''}}{{ value.toLocaleString() }}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    is_currency: {type: Boolean, default: false},
    title: { type: String, default: 'icon-card-title' },
    icon: { type: String, default: 'iconsminds-clock' },
    // img: { type: String, default: '/assets/img/uploads/car.jfif' },
    value: { type: Number, default: 0 }
  }

//   demo(val){
//   if(typeof val == 'string'){
//     if(val.trim() == 'false'){
//       return false,
//     }
//     return true,
//   }
//   return val
//   }
}
</script>
<style scoped>
.cont{
border-radius:20px;
}
</style>


