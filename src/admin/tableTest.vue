<template>
  <span v-show="sentence!==''">当前语句:{{sentence}}</span>
  <span v-show="sentence!==''" style="cursor: pointer"><a-tag color="pink" @click="copySql">点击复制SQL语句</a-tag></span>
  <br>
    操作(必选):<a-select
        ref="select"
        v-model:value="value2"
        style="width: 120px"
        @change="handleChange"
    >
      <a-select-option value="select">select</a-select-option>
    </a-select>
    字段(必选):<a-select
      ref="select"
      v-model:value="value3"
      style="width: 120px"
      @change="handleChange"
  >
    <a-select-option value="*">*(所有字段)</a-select-option>
    <a-select-option v-for="i in columns" :key="i.Id" :value="i.Field">{{ i.Field }}</a-select-option>
  </a-select>
  <a-space>
    表格(必选):<a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @change="handleChangeTable"
  >
    <a-select-option v-for="i in tables" :key="i.Id" :value="i.Tables_in_douyinhot">{{ i.Tables_in_douyinhot }}</a-select-option>
  </a-select>
    条件:<a-select
      ref="select"
      v-model:value="value4"
      style="width: 120px"
      @change="handleChange"
  >
    <a-select-option v-for="i in columns" :key="i.Id" :value="i.Field">{{ i.Field }}</a-select-option>
  </a-select>
  条件值:<a-input v-model:value="value5"></a-input>
  </a-space>
  <a-button @click="getDateBase" type="primary">点击操作</a-button>
<!--  <button v-for="i in lists" :key="i.id" @click="getTest(i)">{{i.name}}</button>-->
  <br>
  <a-button type="primary" danger @click="downLoadExcel">点击下载表格</a-button>
  <div v-if="dataList.length>0" style="height:500px;width: 100%;overflow: scroll;text-align: center">
    <table>
      <tr>
        <th v-for="i in columns" :key="i.Id">{{i.Field}}</th>
      </tr>
      <tr v-for="one in dataList" :key="one.Id">
        <td v-for="two in columns" :key="two.Id" :style="{width:two==='content'?'':'200px',height:'100px',overflow:'hidden'}">{{one[two.Field]}}</td>
      </tr>
    </table>
  </div>
  <h2 v-else>不存在数据</h2>
<!--  {{dataList}}-->
</template>
<script lang='ts'>
import {reactive, ref, toRefs} from "vue";
import useClipboard from "vue-clipboard3";
import {randomTestApi} from "../server/api/randomTest";
import {message} from "ant-design-vue";
import { downLoad } from "../hooks/excel";
export default {
  setup(){
    const { toClipboard } = useClipboard();
    const state=reactive({
      // lists:[
      //   {id:1,api:'select * from hotobject',name:"搜索所有的项目"},
      //   {id:2,api:'select * from admin',name:"搜索所有的管理员"},
      //   {id:3,api:'select * from announcement',name:"搜索所有公告"},
      //   {id:4,api:"SHOW COLUMNS from announcement",name:"搜索所有字段"},
      //   {id:5,api:"SHOW TABLES ",name:"搜索所有的表格"}
      // ],
      /**
       * 存储所有的获取的数据
       * */
      dataList:[],
      value1:ref('请选择表格'),
      value2: ref('请选择操作'),
      value3: ref('请选择字段'),
      value4:ref('请选择字段条件'),
      value5:ref(''),
      /**
       * 搜索语句存储
       * */
      sentence:"",
      /**
       * 存储所有的数据表的数据
       * */
      tables:[],
      /**
       * 存储所有的数据表表格的字段
       * */
      columns:[]
    })
    const getTest=async (item: any) => {
      console.log(item, '点击')
      const {data} = await randomTestApi(item.api)
      console.log(item.name,data)
      state.dataList=data
    }
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    /**
     * 检测表格的更换
     * */
    const handleChangeTable=async (value: string) => {
      console.log(`selected ${value}`, '检测到更改了表格');
      let flag = `SHOW COLUMNS from ${value}`
      const {data} = await randomTestApi(flag)
      console.log('输出所有的表格的字段',data)
      state.columns=data
      state.value3='*'
    }
    /**
     * 输出当前语句并且进行操作
     * */
    const getDateBase=async () => {
      if (state.value1==='请选择表格'||state.value2==='请选择操作'||state.value3==='请选择字段'){
        message.error('请选择操作')
      }else{
        let result;
        if (state.value4==='请选择字段条件'||state.value5===''){
          result=state.value2 + " " + state.value3 + " " + 'from' + " " + state.value1;
        }else{
          let resultLast=" where "+ state.value4+" ="+ state.value5;
          result=state.value2 + " " + state.value3 + " " + 'from' + " " + state.value1+resultLast;
        }
        const {data} = await randomTestApi(result)
        console.log(result, '输出操作语句')
        console.log(data, '输出操作结果')
        state.sentence=result
        state.dataList=data
        message.success('操作成功')
      }
    }
    /**
     * 获取所有的数据表格
     * */
    const getAllTable=async () => {
      const {data} = await randomTestApi("SHOW FULL TABLES")
      console.log(data,'输出所有的数据表')
      state.tables=data
    }
    /**
     * 点击下载表格
     * */
    const downLoadExcel=()=>{
      if (state.dataList.length===0){
        message.error('下载失败！！没有可用数据')
      }else{
        downLoad(state.dataList,'数据库查询数据.xls')
        console.log('输出colunmn',state.columns)
      }
    }
    /**
     * 点击复制sql语句
     * */
    const copySql=()=>{
      toClipboard(state.sentence);
      message.success('SQL语句复制成功!');
    }
    getAllTable()
    return{
      handleChange,
      ...toRefs(state),
      getTest,
      getDateBase,
      getAllTable,
      handleChangeTable,
      downLoadExcel,
      copySql
    }
  }
}
</script>

<style scoped>
*{
  margin: 10px;
}
</style>