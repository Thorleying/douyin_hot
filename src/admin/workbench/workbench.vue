<template>
  <a-row :gutter="16">
    <a-col :span="8" style="margin-bottom: 50px">
      <a-card>
        <p><img src="https://buqiyuan.gitee.io/img/logo.jpg" alt="" class="avatar"> </p>
        <div class="block">
          <p>管理员:{{ adminInfo.nickname }}</p>
          <p>账号:{{ adminInfo.username }}</p>
          <p>IP:<a-tag class="tag" color="pink">{{ adminInfo.ip }}</a-tag></p>
        </div>
        <p>联系电话:<span class="content">{{ adminInfo.telephone }}</span></p>
        <p>邮箱:<span class="content">{{ adminInfo.email }}</span></p>
        <p>登录时间:<span class="content">2022年12月19日15:16 </span></p>
      </a-card>
    </a-col>
    <a-col :span="8" style="margin-bottom: 50px">
      <a-card>
        <div id="char" style="width:400px; height:222px"></div>
      </a-card>
    </a-col>
    <a-col :span="8" style="margin-bottom: 20px">
      <a-card>
        <div style="width:400px; height:222px">
          <ClockData></ClockData>
        </div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card>
        <div id="char1" style="height:240px"></div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import {inject, reactive, toRefs} from "vue";
import {getInfo} from "../../server/api/getUserInfo";
import {onMounted} from 'vue';
import {ECharts, EChartsOption, init} from 'echarts';
import ClockData from "../../components/timeComponent.vue";
export default {
  name: "workbench",
  components: {ClockData},
  setup(){
    let state=reactive({
      adminInfo:{
        nickname:"",
        username:"",
        password:"",
        email:"",
        telephone:"",
        ip:""
      }
    })
    /**
     * 获取当前登录用户的数据
     * */
    const getAdmin=async () => {
      const {data} = await getInfo(sessionStorage.getItem("user"))
      console.log(data[0],'输出当前管理员数据');
      state.adminInfo=data[0]
    }
    getAdmin()
    /**
     * 获取饼状图
     * */
    onMounted(() => {
      const charEle = document.getElementById('char') as HTMLElement;
      const charEch: ECharts = init(charEle);
      const option: EChartsOption = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 65,
                name: '项目数量'
              },
              {
                value:80,
                name: '违规项目'
              },
              {
                value: 56,
                name: '下架项目'
              }
            ]
          }
        ]
      };
      charEch.setOption(option);
    });
    /**
     * 获取大图
     * */
    onMounted(() => {
      const charEle = document.getElementById('char1') as HTMLElement;
      const charEch: ECharts = init(charEle);
      const option: EChartsOption = {
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19],
            type: 'line',
            areaStyle: {}
          },
          {
            data: [25, 14, 23, 35, 10],
            type: 'line',
            areaStyle: {
              color: '#ff0',
              opacity: 0.5
            }
          }
        ]
      };
      charEch.setOption(option);
    });
    return{
      getAdmin,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.avatar{
  width:100px;
  border-radius: 50%;
}
.tag{
  margin-left: 5px;
}
.block{
  position: absolute;
  right:40px;
  top:30px;
}
.content{
  position: absolute;
  right:40px;
}
</style>