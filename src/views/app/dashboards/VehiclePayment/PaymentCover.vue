<template>
  <b-row>
    <b-colxx xxs="12">
      <h5 class="mb-4 card-title">VEHICLE PAYMENTS</h5>
      <b-row>
        <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
          <div v-if="isFetched ">
            <b-card v-for="(payment, index) in payments" v-bind:key="index" class="mb-4" no-body>
              <b-tabs  card no-fade>
                <b-tab title="Acount" active title-item-class="w-50 text-center">
                    <ul>
                    <li>Agent : {{ payment.agent_id }}</li>
                    <li>Garage ID: {{ payment.garage_id }}</li>
                    <li>Account Vehicle ID: {{ payment.account_vehicle_id }}</li>
                    <li>Wallet Transaction ID: {{ payment.account_wallet_transaction_id }}</li>
                    <li>Status: {{ payment.status }}</li>
                    <li>Created On : {{  Timest(payment.createdAt) }}</li>
                    <li></li>
                    </ul>
                </b-tab>
                <b-tab title="Account Vehicle" title-item-class="w-50 text-center">
                <ul>
                  <li>{{payment.account_vehicle.id}}</li>
                  <li>{{payment.account_vehicle.account_id}}</li>
                  <li>{{payment.account_vehicle.vehicle_type_id}}</li>
                  <li>{{payment.account_vehicle.agent_id}}</li>
                  <li>{{payment.account_vehicle.garage_id}}</li>
                  <li>{{payment.account_vehicle.port_id}}</li>
                  <li>{{payment.account_vehicle.plate_number}}</li>
                  <li>{{payment.account_vehicle.vehicle_identification_number}}</li>
                  <li>{{payment.account_vehicle.vehicle_color}}</li>
                  <li>{{payment.account_vehicle.vehicle_brand}}</li>
                  <li>{{payment.account_vehicle.vehicle_year}}</li>
                  <li>{{payment.account_vehicle.vehicle_model}}</li>
                  <li>{{payment.account_vehicle.status}}</li>
                  <li>{{payment.account_vehicle.createdAt}}</li>
                </ul>

                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>
<script>
import Axios from 'axios';
import { PROXY } from '../../../../constants/config';
import { hToken, LUX_ZONE } from '../../../../constants/formKey';
export default {
  data: ()=>({
    payments: null,
    isLoading: true,
    isFetched: false,
    num: 0,

  }),
  methods: {
     fetchPayments(){
      Axios.get(`${PROXY}admin/vehicles/payments`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.payments = res.data.data;
          this.isFetched = true;
          return;
        }else{
          this.isFetched = false;
        }
        this.isLoading = false;

      })
      .catch(err=>{
        this.isFetched = false;
        this.isLoading = false;

      })
    },
    Timest(time){
      return LUX_ZONE(time);
    }

  },
  beforeMount() {
    this.fetchPayments();
  },

  watch: {
    num(){
      // alert(this.num)
    }
  }
}
</script>
