<template>
  <div class="row-item">
    <b-card class="mb-4 text-center">

      <div v-if="selectedPayload">
      <h3><strong>Basic info</strong></h3>
       <p v-for="(item, i) in getKeys(selectedPayload, 0)" v-bind:key="i">
        <Strong>{{ formatName(item) }}: {{ item == "createdAt"?
            formatDate(selectedPayload[0][item]): selectedPayload[0][item] === null? "Null":
            selectedPayload[0][item]
            }}</Strong>
        </p>
      </div>
    </b-card>
    <b-card class="mb-4 text-center">
      <div v-if="selectedPayload">
      <h3><strong>Business Acount Details</strong></h3>
       <p v-for="(item, i) in getKeys(selectedPayload, 1)" v-bind:key="i">
        <Strong>{{ formatName(item) }}: {{ item == "createdAt"?
            formatDate(selectedPayload[1][item]): selectedPayload[1][item] === null? "Null":
            selectedPayload[1][item]
            }}</Strong>
        </p>
      </div>
    </b-card>
    <b-card class="mb-4 text-center">
      <p class="card-text font-weight-semibold mb-0"></p>
      <p class="lead text-center"></p>
    </b-card>
  </div>
</template>
<script>
import { LUX_ZONE } from '../../../../../constants/formKey';
export default {
  props: ['selectedPayload'],
  methods:{
    getKeys(data, index){
      if(!data) return;
      if( data[index]&& data[index].updatedAt){
        delete data[index].updatedAt;

      }
      return Object.keys(data[index]);
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
    console.log(this.selectedPayload);
  }
}

</script>
