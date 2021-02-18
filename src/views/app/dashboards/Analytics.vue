<template>
  <div>
    <b-row class="rounded">
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'spline'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="payers_data"
          ></fusioncharts>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'spline'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="agents_data"
          ></fusioncharts>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3 rounded">
      <b-col>
        <b-card class="r">
          <fusioncharts
            :type="'spline'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="vehicle_payments"
          ></fusioncharts>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3 rounded">
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'msline'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="wallet_credit_transactions"
          ></fusioncharts>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'msline'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="wallet_debit_transactions"
          />
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3 rounded">
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'column2d'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="paying_garages"
          ></fusioncharts>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'column2d'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="paying_ports"
          ></fusioncharts>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3 rounded">
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'column2d'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="vehicle_garages"
          ></fusioncharts>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="r">
          <fusioncharts
            :type="'column2d'"
            :width="'100%'"
            :height="400"
            :dataFormat="'json'"
            :dataSource="agent_garages"
          ></fusioncharts>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import Axios from 'axios'
  import { PROXY } from '../../../constants/config'
  import { hToken, permission } from '../../../constants/formKey'
  import AreaChart from "../../../components/Charts/Area";
  import { ThemeColors } from '../../../utils'
  const colors = ThemeColors()

  export default {
    components:{
      "area-chart": AreaChart
    },
    data:()=>({
      analytic: null,
      isLoading: true,
      isFetched: false,
      payers_data: {
        "chart": {
          "theme": "fusion",
          "caption": "Payers Registrations",
          "xAxisName": "Timeline"
        },
        "data": [
          {
            "label": "Mon",
            "value": "453"
          },
          {
            "label": "Tue",
            "value": "333"
          },
          {
            "label": "Thur",
            "value": "510"
          },
          {
            "label": "Fri",
            "value": "329"
          },
          {
            "label": "Wed",
            "value": "450"
          },
          {
            "label": "Sat",
            "value": "403"
          },
          {
            "label": "Sun",
            "value": "300"
          }
        ]
      },
      agents_data: {
        "chart": {
          "theme": "fusion",
          "caption": "Agents Registrations",
          "xAxisName": "Timeline"
        },
        "data": [
          {
            "label": "Mon",
            "value": "153"
          },
          {
            "label": "Tue",
            "value": "103"
          },
          {
            "label": "Wed",
            "value": "109"
          },
          {
            "label": "Thur",
            "value": "130"
          },
          {
            "label": "Fri",
            "value": "129"
          },
          {
            "label": "Sat",
            "value": "125"
          },
          {
            "label": "Sun",
            "value": "100"
          }
        ]
      },
      wallet_credit_transactions: {
        "chart": {
          "theme": "fusion",
          "caption": "Wallet Credit Transactions",
          "subCaption": "Agents vs Payers",
          "xAxisName": "Timeline",
          "numberPrefix": "₦"
        },
        "categories": [
          {
            "category": [
              {
                "label": "Mon"
              },
              {
                "label": "Tue"
              },
              {
                "label": "Wed"
              },
              {
                "label": "Thu"
              },
              {
                "label": "Fri"
              },
              {
                "label": "Sat"
              },
              {
                "label": "Sun"
              }
            ]
          }
        ],
        "dataset": [
          {
            "seriesname": "Agents",
            "data": [
              {
                "value": "15123"
              },
              {
                "value": "14233"
              },
              {
                "value": "25507"
              },
              {
                "value": "9110"
              },
              {
                "value": "15529"
              },
              {
                "value": "20803"
              },
              {
                "value": "19202"
              }
            ]
          },
          {
            "seriesname": "Payers",
            "data": [
              {
                "value": "13400"
              },
              {
                "value": "12800"
              },
              {
                "value": "22800"
              },
              {
                "value": "12400"
              },
              {
                "value": "15800"
              },
              {
                "value": "19800"
              },
              {
                "value": "21800"
              }
            ]
          }
        ],
        "trendlines": [
          {
            "line": [
              {
                "startvalue": "17022",
                "color": "#62B58F",
                "valueOnRight": "1",
                "displayvalue": "Average"
              }
            ]
          }
        ]
      },
      wallet_debit_transactions: {
        "chart": {
          "theme": "fusion",
          "caption": "Wallet Debit Transactions",
          "subCaption": "Agents vs Payers",
          "xAxisName": "Timeline",
          "numberPrefix": "₦"
        },
        "categories": [
          {
            "category": [
              {
                "label": "Mon"
              },
              {
                "label": "Tue"
              },
              {
                "label": "Wed"
              },
              {
                "label": "Thu"
              },
              {
                "label": "Fri"
              },
              {
                "label": "Sat"
              },
              {
                "label": "Sun"
              }
            ]
          }
        ],
        "dataset": [
          {
            "seriesname": "Agents",
            "data": [
              {
                "value": "15123"
              },
              {
                "value": "14233"
              },
              {
                "value": "25507"
              },
              {
                "value": "9110"
              },
              {
                "value": "15529"
              },
              {
                "value": "20803"
              },
              {
                "value": "19202"
              }
            ]
          },
          {
            "seriesname": "Payers",
            "data": [
              {
                "value": "13400"
              },
              {
                "value": "12800"
              },
              {
                "value": "22800"
              },
              {
                "value": "12400"
              },
              {
                "value": "15800"
              },
              {
                "value": "19800"
              },
              {
                "value": "21800"
              }
            ]
          }
        ],
        "trendlines": [
          {
            "line": [
              {
                "startvalue": "17022",
                "color": "#62B58F",
                "valueOnRight": "1",
                "displayvalue": "Average"
              }
            ]
          }
        ]
      },
      vehicle_payments: {
        "chart": {
          "theme": "fusion",
          "caption": "Vehicle Payments",
          "xAxisName": "Timeline",
          "numberPrefix": "₦"
        },
        "data": [
          {
            "label": "Mon",
            "value": "55123000"
          },
          {
            "label": "Tue",
            "value": "34233000"
          },
          {
            "label": "Wed",
            "value": "25507000"
          },
          {
            "label": "Thur",
            "value": "31100000"
          },
          {
            "label": "Fri",
            "value": "45529000"
          },
          {
            "label": "Sat",
            "value": "40803000"
          },
          {
            "label": "Sun",
            "value": "19202000"
          }
        ]
      },
      paying_garages: {
        "chart": {
          "theme": "fusion",
          "caption": "Payments Based On Garages",
          "xAxisName": "Timeline",
          "numberPrefix": "₦"
        },
        "data": [
          {
            "label": "Oshodi",
            "value": "133000"
          },
          {
            "label": "Ajah",
            "value": "203000"
          },
          {
            "label": "Under Bridge Ikeja",
            "value": "910000"
          },
          {
            "label": "Berger",
            "value": "129000"
          },
          {
            "label": "Ketu",
            "value": "153000"
          },
          {
            "label": "Amuwo Odofun",
            "value": "120200"
          },
          {
            "label": "Ogudu",
            "value": "250000"
          },
        ]
      },
      paying_ports: {
        "chart": {
          "theme": "fusion",
          "caption": "Payments Based On Ports",
          "xAxisName": "Timeline",
          "numberPrefix": "₦"
        },
        "data": [
          {
            "label": "Apapa",
            "value": "1330000"
          },
          {
            "label": "Tin Can",
            "value": "2000000"
          }
        ]
      },
      vehicle_garages: {
        "chart": {
          "theme": "fusion",
          "caption": "Vehicles In Garages"
        },
        "data": [
          {
            "label": "Under Bridge Ikeja",
            "value": "910"
          },
          {
            "label": "Berger",
            "value": "129"
          },
          {
            "label": "Ajah",
            "value": "203"
          },
          {
            "label": "Amuwo Odofun",
            "value": "1202"
          },
          {
            "label": "Ketu",
            "value": "153"
          },
          {
            "label": "Oshodi",
            "value": "133"
          },
          {
            "label": "Ogudu",
            "value": "250"
          },
        ]
      },
      agent_garages: {
        "chart": {
          "theme": "fusion",
          "caption": "Agents in Garages"
        },
        "data": [
          {
            "label": "Under Bridge Ikeja",
            "value": "910"
          },
          {
            "label": "Berger",
            "value": "129"
          },
          {
            "label": "Ketu",
            "value": "153"
          },
          {
            "label": "Oshodi",
            "value": "133"
          },
          {
            "label": "Ajah",
            "value": "203"
          },
          {
            "label": "Amuwo Odofun",
            "value": "1202"
          },
          {
            "label": "Ogudu",
            "value": "250"
          },
        ]
      }
    }),
    methods:{
      fetchAnalytics(){
        Axios.get(`${PROXY}admin/analytics`, {headers: hToken()})
          .then(res=>{
            if(!res.data.error){
              this.analytic = res.data.data;
              this.loadChartData()
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
      formatDate(date){
        return moment(date).format("YYYY-MM-DD");
      },
      chartInputs(xTitle, yTitle, xName, yName, numberprefix){
        return {
          caption: xTitle,
          subCaption: yName,
          xAxisName: xName,
          yAxisName: yTitle,
          numberprefix,
          showValues: "0",
          theme: "fusion"
        }
      },
      loadChartData() {
        const data = [].map(x => {
          return {
            label: new Date(x.createdAt).toDateString(),
            value: x.total
          }
        })

        this.chart_data = {
          data: data,
          chart: this.chartInputs("Vehicle Payments", "Amount in Naira", "Timeline", "", "₦")
        }
      },
    },

    created(){
      this.fetchAnalytics();
    },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("analytics", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })
  }

}
</script>
