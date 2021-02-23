<template>
  <div>
    <b-card>
      <b-tabs card no-fade>
        <b-tab title="Payers">
          <!--Payers report here-->
          <payers-report />
        </b-tab>
        <b-tab title="Agents">
          <agents-report />
        </b-tab>
        <b-tab title="Agents System Activities">
          <agent-system-report />
        </b-tab>
        <b-tab title="Admins System Activities">
          <admin-system-report />
        </b-tab>
        <b-tab title="Payers System Activities">
          <payer-system-report />
        </b-tab>
        <b-tab title="Vehicles">
          <vehicles-report />
        </b-tab>
        <b-tab title="All Vehicle Payments">
          <vehicle-payment-report />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>// @ts-nocheck
import AdminSystemReport from './AdminSystemReport.vue';
import AgentsReport from './AgentsReport.vue';
import AgentSystemReport from './AgentSystemReport.vue';
import PayersReport from './PayersReport.vue';
import PayerSystemReport from './PayerSystemReport.vue';
import VehiclePaymentReport from './VehiclePaymentReport.vue';
import VehiclesReport from './VehiclesReport.vue';


  export default {
    name: 'Reports',
    components: {
        PayersReport,
        AgentsReport,
        AgentSystemReport,
        AdminSystemReport,
        PayerSystemReport,
        VehiclesReport,
        VehiclePaymentReport
    },
    data(){
      return {

      }
    },

    methods: {

      seeVent(data){
        console.log(data);
      },

      omal(){
        this.$refs['vuetable-payer'].downloadCsv('table.csv')//refresh();
      }
    },
  }
</script>
