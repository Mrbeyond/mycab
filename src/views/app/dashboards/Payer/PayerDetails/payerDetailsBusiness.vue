<template>
  <div class="row-item">
      <b-card class="mb-4">
  <div v-if="selectedPayload">
  <h3><strong>Business Account Details</strong></h3>
    <div v-for="(item, i) in getKeys(selectedPayload, 1)" v-bind:key="i">
    <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
    <p class="mb-3">
      {{ item == "createdAt"?
      formatDate(selectedPayload[item]): selectedPayload[item] === null? "Null":
      selectedPayload[item]
      }}
    </p>
    </div>
</div>
</b-card>

  </div>
</template>
<script>
import { LUX_ZONE } from '../../../../../constants/formKey';
export default {
  props: ['PAYLOAD'],
  methods:{
    getKeys(data){
      if(!data) return;
      if( data&& data.updatedAt){
        delete data.updatedAt;

      }
      return Object.keys(data).filter(data=> !data.toString().includes('id'));
    },

    formatName(name){
      if(!name) return "";
      let Name = name.toString();
      name = name.replace('_', " ");
      name = name.charAt(0).toUpperCase()+name.slice(1, name.length)
      return name;
    },

    formatDate(date){
      return LUX_ZONE(date);
    }
  }
  ,
  computed: {
  },
  mounted(){
    console.log(this.PAYLOAD);
  }
}

</script>












