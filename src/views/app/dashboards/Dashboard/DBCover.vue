<template>
  <div v-if="isLoading && !isFetched" style="h-100">

    <div class="align-middle">
      <div class="d-flex justify-content-center">
        <b-spinner variant="primary" />
      </div>
    </div>
  </div>

  <div v-else-if=" !isLoading && !isFetched">

    Error template here
  </div>
  <div v-else>
    <Analytics :analytic="analytic" />
    <b-card class="r"  v-if="analytic">
      <fusioncharts

        :type="'spline'"
        :width="'100%'"
        :height="400"
        :dataFormat="'json'"
        :dataSource="chart_data"
      ></fusioncharts>
    </b-card>
  </div>
</template>
<script>
import Axios from 'axios'
import { PROXY } from '../../../../constants/config'
import { hToken, permission } from '../../../../constants/formKey'
import Analytics from './Analytics/Analytics';
import AreaChart from "../../../../components/Charts/Area";
import { ThemeColors } from '../../../../utils'
const colors = ThemeColors()

export default {
  components:{
    Analytics,
    "area-chart": AreaChart
  },
  data:()=>({
    analytic: null,
    isLoading: true,
    isFetched: false,
    chart_data: {
      data: [],
      chart: {}
    },

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
      const data = this.analytic.total_vehicle_payment_group_by_date_chart.map(x => {
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

  beforeMount(){
    this.fetchAnalytics();
  },

  created(){
    if(!permission("dashboard", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }
  },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("dashboard", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })

  }

}
</script>
