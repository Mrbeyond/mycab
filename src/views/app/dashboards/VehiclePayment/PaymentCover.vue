<template>

  <div>

    <h5 class="mb-4 card-title">VEHICLE PAYMENTS</h5>
      <div v-if="isFetched" class="row">
          <div
            v-for="(payment, index) in payments" v-bind:key="index"
            class="col-12 col-md-6"
          >
            <b-card class="mb-4" no-body >
            <div style=" height: 300px; max-height: 300px; overflow-y: auto">
              <b-tabs  card no-fade>
                <b-tab title="Acount" active title-item-class="w-30 text-center">
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
                <b-tab title="Account Vehicle" title-item-class="w-30">
                <div class="text-center ">
                  <ul>
                    <li>ID: {{payment.account_vehicle.id}}</li>
                    <li>Account ID: {{payment.account_vehicle.account_id}}</li>
                    <li>Vehicle Type ID: {{payment.account_vehicle.vehicle_type_id}}</li>
                    <li>Agent ID: {{payment.account_vehicle.agent_id}}</li>
                    <li>Garage ID: {{payment.account_vehicle.garage_id}}</li>
                    <li>Port ID: {{payment.account_vehicle.port_id}}</li>
                    <li>Plate Number: {{payment.account_vehicle.plate_number}}</li>
                    <li>VIN: {{payment.account_vehicle.vehicle_identification_number}}</li>
                    <li>Color: {{payment.account_vehicle.vehicle_color}}</li>
                    <li>Brand: {{payment.account_vehicle.vehicle_brand}}</li>
                    <li>Year: {{payment.account_vehicle.vehicle_year}}</li>
                    <li>Model: {{payment.account_vehicle.vehicle_model}}</li>
                    <li>Status: {{payment.account_vehicle.status}}</li>
                    <li>created On: {{payment.account_vehicle.createdAt}}</li>
                  </ul>
                </div>

                </b-tab>
                <b-tab title="Account Wallet" title-item-class="w-30">
                <div class="text-center ">
                  <ul>
                    <li>ID: {{ payment.account_wallet_transaction.account_wallet_id}}</li>
                    <li>Amount: {{ payment.account_wallet_transaction.amount}}</li>
                    <li> Type: {{ payment.account_wallet_transaction.type}}</li>
                    <li> Status: {{ payment.account_wallet_transaction.status}}</li>
                    <li>Created On: {{ Timest(payment.account_wallet_transaction.createdAt)}}</li>
                  </ul>
                </div>
                </b-tab>
              </b-tabs>
              </div>
              <div class="text-center">
                <strong>{{ payment.garage? ` Garage: ${ payment.garage}`: '' }}</strong>
              </div>
            </b-card>
          </div>
      </div>
  </div>
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
