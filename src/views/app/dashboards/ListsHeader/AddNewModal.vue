<template>
  <b-modal
    id="_modalright"
    ref="_modalright"
    :title="modalTitle"
    modal-class="modal-right"
  >
      <add-admin v-if="formKey == ADD_ADMIN" />
      <add-agent  v-if="formKey == ADD_AGENT"/>
      <add-card  v-if="formKey == ADD_CARD"/>
      <add-payer v-if="formKey == ADD_PAYER" />
      <add-tag  v-if="formKey == ADD_TAG"/>
      <add-terminal v-if="formKey == ADD_TERMINAL" />
      <add-port  v-if="formKey == ADD_PORT"/>
      <AddLG v-if="formKey == ADD_LG" />
      <add-garage v-if="formKey == ADD_GARAGE" />

    <template slot="modal-footer">
      <b-button
        variant="outline-secondary"
        @click="hideModal('_modalright')"
      >{{ $t('pages.cancel') }}</b-button>
    </template>
  </b-modal>
</template>
<script>// @ts-nocheck

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import AddAdmin from '@/views/app/dashboards/AdderForms/AddAdmin';
import AddAgent from '../AdderForms/AddAgent.vue';
import AddCard from '../AdderForms/AddCard.vue';
import AddPayer from '../AdderForms/AddPayer.vue';
import AddTag from '../AdderForms/AddTag.vue';
import AddLG from '../AdderForms/AddLG.vue';
import AddPort from '../AdderForms/AddPort.vue';
import AddTerminal from '../AdderForms/AddTerminal'
import AddGarage from '../AdderForms/AddGarage.vue';

import {ADD_ADMIN, ADD_CARD, ADD_TAG, ADD_CV, ADD_IV, ADD_AGENT,
  ADD_PAYER, ADD_TERMINAL, ADD_PORT, ADD_LG, ADD_GARAGE
} from './../../../../constants/formKey';

export default {
  components: {
    "v-select": vSelect, AddAdmin,
    AddAgent, AddCard, AddPayer, AddTag,
    AddTerminal, AddLG, AddPort, AddGarage
  },
  props:["opener", "formKey"],
  data() {
    return {
      ADD_GARAGE,
      ADD_ADMIN,
      ADD_CARD,
      ADD_TAG,
      ADD_CV,
      ADD_IV,
      ADD_AGENT,
      ADD_PAYER,
      ADD_TERMINAL,
      ADD_PORT,
      ADD_LG,
      newItem: {
        title: "",
        category: "",
        description: "",
        status: ""
      }
    };
  },
  methods: {
    addNewItem() {
      console.log("adding item : ", this.newItem);
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    }
  },

  watch:{
    opener(){
      if(this.opener === true){
        this.$refs['_modalright'].show();
      }
    }
  },

  // mounted(){
  //   console.log(this.opener);
  // },

  computed: {
    modalTitle(){
      if(this.formKey === ADD_PAYER){
        return "Register Payer"
      }
      if(this.formKey === ADD_AGENT){
        return "Register Agent"
      }
      if(this.formKey === ADD_ADMIN){
        return "Register Admin"
      }
      if(this.formKey === ADD_TAG){
        return "Add New Tag"
      }
      if(this.formKey === ADD_CARD){
        return "Add New Card"
      }
      if(this.formKey === ADD_TERMINAL){
        return "Add New Terminal"
      }
      if(this.formKey === ADD_PORT){
        return "Add New Port"
      }
      if(this.formKey === ADD_LG){
        return "Add New Local Government"
      }
      if(this.formKey === ADD_GARAGE){
        return "Add New Garage"
      }

      return "FORM";
    }
  }

};
</script>

