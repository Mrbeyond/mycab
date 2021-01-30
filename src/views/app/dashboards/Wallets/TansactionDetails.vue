<template>
<div>
  <b-row class="invoice">
    <b-colxx xxs="12" class="mb-4">
        <div class="invoice-contents" style="height:1200px; max-width:830px; font-family: Helvetica,Arial,sans-serif !important; position: relative;">
          <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate !important; border-spacing:0; margin:0;padding:30px; padding-top: 20px;" heigth="auto">
              <tbody>
                  <tr>
                      <td align="left" valign="center" style="padding-bottom:35px; padding-top:15px; border-top:0;width:100% !important;">
                          <!-- <img src="https://coloredstrategies.com/mailing/piaf.png" /> -->
                          <span> Wallet owner</span>
                      </td>
                      <td align="right" valign="center" style="padding-bottom:20px;border-top:0;width:100% !important;">
                          <p style="color: #8f8f8f; font-weight: normal; line-height: 1.2; font-size: 12px; white-space: nowrap; ">
                              wallet balance:N 0
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="2" style="padding-top:30px; border-top:1px solid #f1f0f0">
                          <table style="width: 100%; margin-top:40px;">
                              <thead>
                                  <tr>
                                      <th style="text-align:left; font-size: 10px; color:#8f8f8f; padding-bottom: 15px; padding-top:10px; padding-bottom:10px;">
                                         Payment channel
                                      </th>
                                      <th style="text-align:left; font-size: 10px; color:#8f8f8f; padding-bottom: 15px; padding-top:10px; padding-bottom:10px;">
                                          Type
                                      </th>
                                      <th style="text-align:right; font-size: 10px; color:#8f8f8f; padding-bottom: 15px; padding-top:10px; padding-bottom:10px;">
                                          Reference
                                      </th>
                                      <th style="text-align:right; font-size: 10px; color:#8f8f8f; padding-bottom: 15px; padding-top:10px; padding-bottom:10px;">
                                          Amount
                                      </th>
                                      <th style="text-align:right; font-size: 10px; color:#8f8f8f; padding-bottom: 15px; padding-top:10px; padding-bottom:10px;">
                                          Description
                                      </th>
                                      
                                  </tr>
                              </thead>
                              <tbody v-if="transDetails">
                                  <tr v-for="(item,index) in transDetails" :key="index">
                                      <td style="padding-top:0px; padding-bottom:5px; padding-top:10px; padding-bottom:10px;">
                                          <p v-if="item.payment_channel!=null" class="text-primary" style="font-size: 13px; line-height: 1; margin-bottom:0; font-weight:500; margin-top: 10px;">
                                             {{item.payment_channel.name}}
                                             </p>
                                      </td>
                                      <td style="padding-top:0px; padding-bottom:5px; padding-top:10px; padding-bottom:10px;">
                                          <p class="text-primary" style="font-size: 13px; line-height: 1; margin-bottom:0; font-weight:500; margin-top: 10px;">
                                             {{item.type}}
                                             </p>
                                      </td>
                                       <td style="padding-top:0px; padding-bottom:0; text-align: right; padding-top:10px; padding-bottom:10px;">
                                          <p class="text-primary" style="font-size: 13px; line-height: 1; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                             {{item.reference}}
                                             </p>
                                      </td>
                                       <td style="padding-top:0px; padding-bottom:0; text-align: right; padding-top:10px; padding-bottom:10px;">
                                          <p class="text-primary"  style="font-size: 13px; line-height: 1; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                             {{item.amount}}
                                             </p>
                                      </td>
                                      <td style="padding-top:0px; padding-bottom:0; text-align: right; padding-top:10px; padding-bottom:10px;">
                                          <p class="text-primary"  style="font-size: 13px; line-height: 1; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                             {{item.description}}
                                             </p>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>

          <!-- <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="position:absolute; bottom:0; width:100%; background-color:#ffffff;border-collapse:separate !important; border-spacing:0;color:#242128; margin:0;padding:30px; padding-top: 20px;"
              heigth="auto">
              <tr>
                  <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
              </tr>
              <tr>
                  <td colspan="2" style="width: 100%;padding-top:10px; padding-bottom:10px;">
                      <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                          Subtotal : </p>
                  </td>
                  <td style="padding-top:0px; text-align: right;padding-top:10px; padding-bottom:10px;">
                      <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">$
                          61.82</p>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="width: 100%;padding-top:10px; padding-bottom:10px;">
                      <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                          Tax : </p>
                  </td>
                  <td style="padding-top:0px; text-align: right;padding-top:10px; padding-bottom:10px;">
                      <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">$
                          2.18</p>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="width: 100%;padding-top:10px; padding-bottom:10px;">
                      <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                          Shipping : </p>
                  </td>
                  <td style="padding-top:0px; text-align: right;padding-top:10px; padding-bottom:10px;">
                      <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">$
                          3.21</p>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style=" width: 100%; padding-bottom:15px; padding-top:10px;">
                      <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                          <strong>Total : </strong></p>
                  </td>
                  <td style="padding-top:0px; text-align: right; padding-bottom:15px; padding-top:10px;">
                      <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px"><strong>$
                              68.14</strong></p>
                  </td>
              </tr>
              <tr>
                  <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
              </tr>
              <tr>
                  <td colspan="3" style="text-align:center;">
                      <p style="color: #909090; font-size:11px; text-align:center;">Invoice was created
                          on a computer and
                          is valid without the signature and seal. </p>
                  </td>
              </tr>
          </table> -->
      </div>

    </b-colxx>
  </b-row>
</div>
</template>

<script>
import router from 'vue-router'

export default {
  data () {
    return {
      pname:"",
      transDetails: [
       {
            "reference": "mnjfne",
            "description": "dfjnee",
            "amount": 2000,
            "type": 1,
            "status": 1,
            "createdAt": "2021-01-28T14:26:11.000Z",
            "payment_channel": {
                "name": "Paystack"
            }
        },
        {
            "reference": null,
            "description": null,
            "amount": 200000,
            "type": 1,
            "status": 1,
            "createdAt": "2021-01-28T13:50:33.000Z",
            "payment_channel": null
        }
      ]
    }
  },
  components: {
      },
  mounted: function(){
      this.pname =this.$router.currentRoute.params.name
    //   console.log(this.pname)
  },
 watch: {
    $route(to, from) {
      this.pname = to.params.name
    //   console.log(this.pname)

    }
  }
};
</script>
