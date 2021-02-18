<template>
  <div class="row-item">
    <b-card class="mb-4">

      <div v-if="selectedPayload[0]">
      <h3><strong>Basic info</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload, 0)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload[0][item]):
          formatName(item) == "Verified"?  veriState(selectedPayload[0][item]):
          formatName(item) == "Status" ?
          ensState(selectedPayload[0][item]): selectedPayload[0][item] == null? "No value": selectedPayload[0][item]
          }}
        </p>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4">
      <div v-if="selectedPayload[1]">
      <h3><strong>Business Account Details</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload, 1)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload[1][item]): selectedPayload[1][item] === null? "Null":
           selectedPayload[1][item]
          }}
        </p>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { LUX_ZONE, statusA, statusV } from '../../../../../constants/formKey';
export default {
  props: ['selectedPayload'],
  methods:{
    getKeys(data, index){
      if(!data) return;
      if( data[index]&& data[index].updatedAt){
        delete data[index].updatedAt;

      }
      return Object.keys(data[index]).filter(data=> !data.toString().includes('id'));
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
    },

    ensState(val){
      return statusA[Number(Boolean(!!Boolean(val)))];
    },

    veriState(val){
      return statusV[Number(val)];
    }
  }
  ,
  computed: {
  },

}

</script>
