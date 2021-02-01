<template>
  <div ref="qrcode"></div>
</template>
<script>
  import * as QRCode from 'easyqrcodejs'

  export default {
    name: 'QrCode',
    props: ["text","width","height","size"],
    mounted() {
      // Options
      let options = {
        text: this.text,
        logo: "https://www.lasepa.gov.ng/wp-content/uploads/2019/12/las-d.png",
        logoBackgroundTransparent: true,
        width: 150,
        height: 150,
        logoHeight: 80,
        logoWidth: 80,
        size: 150
      }

      // Create new QRCode Object
      new QRCode(this.$refs.qrcode, options);
    },
    methods: {
      btnClick() {

      }
    }
  }
</script>
