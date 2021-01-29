<template>
  <b-modal
    id="modalright"
    ref="modalright"
    :title="modalTitle"
    modal-class="modal-right"
  >
      <add-admin v-if="formKey == ADD_ADMIN" />
      <add-agent  v-if="formKey == ADD_AGENT"/>
      <add-card  v-if="formKey == ADD_CARD"/>
      <add-payer v-if="formKey == ADD_PAYER" />
      <add-tag  v-if="formKey == ADD_TAG"/>

    <template slot="modal-footer">
      <b-button
        variant="outline-secondary"
        @click="hideModal('modalright')"
      >{{ $t('pages.cancel') }}</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import AddAdmin from '@/views/app/dashboards/AdderForms/AddAdmin';
import AddAgent from '../AdderForms/AddAgent.vue';
import AddCard from '../AdderForms/AddCard.vue';
import AddPayer from '../AdderForms/AddPayer.vue';
import AddTag from '../AdderForms/AddTag.vue';
import {ADD_ADMIN, ADD_CARD, ADD_TAG, ADD_CV, ADD_IV, ADD_AGENT,
  ADD_PAYER
} from './../../../../constants/formKey';

export default {
  components: {
    "v-select": vSelect,    AddAdmin,
    AddAgent, AddCard, AddPayer, AddTag
  },
  props: ["categories", "statuses", "formKey"],
  data() {
    return {
      ADD_ADMIN,
      ADD_CARD,
      ADD_TAG,
      ADD_CV,
      ADD_IV,
      ADD_AGENT,
      ADD_PAYER,
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
        return "Add Tag"
      }
      if(this.formKey === ADD_CARD){
        return "Add Card"
      }

      return "FORM";
    }
  }

};
</script>

