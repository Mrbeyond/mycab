<template>


</template>
<script>
export default {
  data:()=>({
      show: false,
      showMenuTop: false,
      opener: false,
      current_path: " ",
      compo: "",
      formKey: "",
  }),
  methods: {
    openFormsModal(){
      this.opener = true;
      setTimeout(()=>{this.opener = false}, 300)
      // alert()
    }
  },

  computed: {
    enroute(){
      return this.$route.path;
    },
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  },
  watch: {
    enroute(){
      console.log(this.enroute);
      let arr = ["agents","payers","admins","terminals", "cards", 'tags' ];
      if(this.enroute.split('/').length === 3){
        let curr = arr.find(data=>data.toString().toLowerCase() === this.enroute.split('/')[2].toString().toLowerCase());
        if(curr){
          curr = curr.toString();
         let ind = arr.indexOf(curr);
          this.formKey =  this.formSets[ind];
          this.current_path = curr.charAt(0).toUpperCase()+curr.slice(1, curr.length);
          this.showMenuTop = true;
        }else{
          this.showMenuTop = false;
          this.current_path=""
          this.formKey=""
        }
      }
    }

  },

 beforeMount(){
      let arr = ["agents","payers","admins","terminals", "cards", 'tags' ];
      if(this.enroute.split('/').length === 3){
        let curr = arr.find(data=>data.toString().toLowerCase() === this.enroute.split('/')[2].toString().toLowerCase());
        if(curr){
          curr = curr.toString();
          let ind = arr.indexOf(curr)
          this.formKey =  this.formSets[ind];
          this.current_path = curr.charAt(0).toUpperCase()+curr.slice(1, curr.length);
          this.showMenuTop = true;
        }else{
          this.showMenuTop = false;
          this.current_path=""
          this.formKey=""
        }
      }
 }
}
</script>
