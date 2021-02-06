<template>
  <div v-if="PAYLOAD">
        <!-- The basic info card -->
      <div  class="row" >
        <div v-if="basicLoad" class="col-12 col-md-6 d-flex">
          <b-card class="flex-fill" style="border-radius:15px">
            <div>
              <h3><strong>Basic info</strong></h3>
              <div v-for="(item, i) in getKeys(basicLoad)" v-bind:key="i">
                <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
                <p class="mb-3">
                  {{ item == "createdAt"?
                  formatDate(basicLoad[item]):
                  item == "verified"? (Boolean(basicLoad[item])? 'Yes': 'No'):
                   formatName(item) == "Status" ?
                  ensState(basicLoad[item]): basicLoad[item] == null? "No value": basicLoad[item]
                  }}

                </p>
              </div>
            </div>
          </b-card>
        </div>

        <div v-if="businessLoad" class="col-12 col-md-6 d-flex">
          <!-- This account wallet info card -->
          <b-card class="flex-fill" style="border-radius:15px">
            <div>
              <h3><strong>Business Account Details</strong></h3>
              <div v-for="(item, i) in getKeys(businessLoad)" v-bind:key="i">
                <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
                <p class="mb-3">
                  {{ item == "createdAt"?
                  formatDate(businessLoad[item]): businessLoad[item] === null? "Null":
                  businessLoad[item]
                  }}
                </p>
              </div>
            </div>
          </b-card>
        </div>



    </div>
  </div>
</template>
<script>
import { LUX_ZONE, statusA } from '../../../../../constants/formKey';
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
    },

    ensState(val){
      return statusA[Number(Boolean(!!Boolean(val)))];
    },

  }
  ,
  computed: {
    businessLoad(){
      if(this.PAYLOAD){
        return this.PAYLOAD.business;
      }else{
        return null
      }
    },

    basicLoad(){
      if(this.PAYLOAD){
        return this.PAYLOAD.basic;
      }else{
        return null
      }
    }
  },
  mounted(){
    // console.log(this.PAYLOAD);
  }
}

</script>
