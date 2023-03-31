<template>
<div>
  <h1>项目编辑页面</h1>
  <img :src="obj.img" alt="" style="width: 200px">
  <div class="inputs">
    名称：<a-input type="text" v-model:value="obj.name" :disabled="isNotEdit"/>
    <br>
    链接：<a-input type="text" v-model:value="obj.href" :disabled="isNotEdit"/>
  </div>
  <a-button type="primary" v-if="isNotEdit" @click="edit">点击编辑</a-button>
  <a-button v-else @click="save" type="primary" danger>点击保存</a-button>
</div>
</template>

<script lang="ts">
import {useRoute,useRouter} from "vue-router";
import {reactive, toRefs} from "vue";
import {getDetailData, UpdateObjData} from "../server/api/getHomeData";
interface obj{
  Id:string,
  name:string,
  href:string,
  img:string
}
export default {
  name: "editObj",
  setup(){
    const route=useRoute()
    const router=useRouter()
    let state=reactive({
      obj:{
        Id:"",
        name:"",
        href:"",
        img:""
      } as obj,
      isNotEdit:true
    })
    /*
    * 获取传参的参数
    * */
    const getParam=async () => {
      const {data}=await getDetailData(route.query.editDataId);
      console.log(data,'输出具体id数据')
      state.obj={...state.obj,...data[0]}
    }
    getParam()
    /*
    * 点击编辑
    * */
    const edit=()=>{
      state.isNotEdit=false;
    }
    /*
    * 点击保存
    * */
    const save=async () => {
      state.isNotEdit = true;
      let obj = {Id: state.obj.Id, name: state.obj.name, href: state.obj.href, img: state.obj.img}
      console.log(obj, '输出更改后的数据')
      const {data} = await UpdateObjData(obj);
      if (data===1){
        alert('修改成功,3s后返回主页');
        await getParam()
        setTimeout(()=>{
          router.push('/admin-user')
        },3000)
      }
    }
    return{
      ...toRefs(state),
      getParam,
      edit,
      save
    }
  }
}
</script>

<style scoped>
*{
  margin: 10px;
}
.inputs{
  margin:10px 0;
}
</style>