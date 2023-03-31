<template>
  <h2>上传项目</h2>
  <van-uploader :after-read="afterRead" v-if="!img"/>
  <img :src="img" alt="" style="width:200px;" v-else><br>
  <br>
<!--  <div class="form">-->
    <a-input type="text" placeholder="请输入标题" v-model:value="name"/>
    <br><br>
    <a-input type="text" placeholder="请输入链接" v-model:value="href"/>
    <br><br>
<!--  </div>-->
  <a-button @click="sub" type="primary">点击提交</a-button>
</template>

<script lang="ts">
import axios from "axios";
import {reactive, toRefs} from "vue";
import {addObj} from "../server/api/operate";
import {useRouter} from "vue-router";
import {isUrl} from "../hooks/match";
import useClipboard from "vue-clipboard3";
import {message} from "ant-design-vue";
import {insertBanner} from "../server/api/Banner";
import {getNowDate} from "../hooks/time";
const { toClipboard } = useClipboard();
export default {
  name: "uploadObj",
  setup(){
    const router=useRouter()
    let state=reactive({
      fileData: null,
      img:"",
      name:"",
      href:""
    })
    //sliceFile为自定义分片并上传的函数
    // const changeFile = (e: any) => {
    //   // 获取文件
    //   const file = e.target.files[0];
    //   state.fileData=file;
    //   console.log("file::::", file);
    //   setTimeout(()=>{
    //     upload()
    //   },100)
    // }

    // const upload=()=>{
    //   if(!state.fileData){
    //     alert('请选择文件，然后在点击上传')
    //   }else{
    //     let flag=state.fileData.name;
    //     console.log("https://thorleying.work/bbq/upload/"+flag)
    //     let formData = new FormData();
    //     formData.append("file", state.fileData);
    //     axios({
    //       url:'https://thorleying.work/bbq/uploadImg.php',
    //       method:"post",
    //       data: formData,
    //     }).then(res=>{
    //       console.log(res.data)
    //       // alert('文件上传成功')
    //       state.img="https://thorleying.work/bbq/upload/"+flag;
    //     })
    //   }
    // }

    /**
     * 点击进行提交
     * */
    const sub=async () => {
      const obj = {name: state.name, href: state.href, img: state.img,time:getNowDate()}
      console.log(obj)
      const {data} = await addObj(obj);
      console.log(data,'输出状态')
      if (data===1){
        message.success('添加成功')
        await router.push('/admin-user')
      }
    }
    /**
     * 上传
     * */
    const afterRead = (file) => {
      let formData = new FormData();
      formData.append("file", file.file);
      axios({
        url:'https://thorleying.work/bbq/uploadImg.php',
        method:"post",
        data: formData,
      }).then(async res => {
        console.log(res.data)
        state.img="https://thorleying.work/bbq/upload/"+file.file.name;
      })
    };
    return{
      ...toRefs(state),
      sub,
      afterRead
    }
  }
}
</script>

<style scoped>
*{
  margin: 10px;
}
.form{
  width:48%;
}
</style>