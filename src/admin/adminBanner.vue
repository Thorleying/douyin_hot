<template>
  <h2>轮播图库</h2>
  <van-uploader :after-read="afterRead" v-show="isDel"/>
  <a-button type="primary" v-if="isDel" danger @click="openDelete">点击取消删除</a-button>
  <a-button type="primary" v-else  @click="openDelete">点击管理图片</a-button>
  <br>
  <div class="banner" v-for="i in banner" :key="i.Id">
    <img :src="i.img" alt="" style="width: 100%;height: 140px">
    <a-button type="primary" danger class="delete" v-show="isDel" @click="delBanner(i)">删除</a-button>
  </div>
</template>

<script lang="ts">
import {deleteBanner, getBanner, insertBanner} from "../server/api/Banner";
import {reactive, toRefs} from "vue";
import axios from "axios";
import { message } from "ant-design-vue";

export default {
  name: "adminBanner",
  setup(){
    let state=reactive({
      banner:[],
      fileData:null,
      isDel:false
    })
    /**
    * 获取banner 数据
    * */
    const getBannerData=async () => {
      const {data} = await getBanner();
      state.banner=data
    }
    /**
    * 测试输出数据
    * */
    const consoleData=(i:any)=>{
    }
    /**
    * 文件跟换
    * */
    // const changeFile = (e: any) => {
    //   // 获取文件
    //   const file = e.target.files[0];
    //   state.fileData=file;
    //   console.log("file::::", file);
    //   setTimeout(()=>{
    //     upload()
    //   },100)
    // }
    /**
    * 上传接口
    * */
    // const upload=()=>{
    //   if(!state.fileData){
    //     alert('请选择文件')
    //   }else{
    //     let flag=state.fileData.name;
    //     console.log("https://thorleying.work/bbq/upload/"+flag)
    //     let formData = new FormData();
    //     formData.append("file", state.fileData);
    //     axios({
    //       url:'https://thorleying.work/bbq/uploadImg.php',
    //       method:"post",
    //       data: formData,
    //     }).then(async res => {
    //       console.log(res.data)
    //       // alert('文件上传成功')
    //       await insertBanner(`https://thorleying.work/bbq/upload/${flag}`)
    //       // state.img="https://thorleying.work/bbq/upload/"+flag;
    //       await getBannerData()
    //     })
    //   }
    // }
    /**
    * 点击删除的按钮出现
    * */
    const openDelete=()=>{
      state.isDel=!state.isDel
    }
    /**
    * 点击进行每个banner的删除
    * */
    const delBanner=async (i: any) => {
     if(confirm("是否删除这个")){
       const {data} = await deleteBanner(i.Id);
       console.log(data,'输出删除的状态')
       if (data===1){
         message.success('删除成功');
         await getBannerData()
       }
     }else{
       alert("取消成功")
     }
    }
    getBannerData()
    /**
     * 上传文件
     * */
    const afterRead = (file) => {
      if (state.banner.length===8){
        message.error("上传失败，最多只能上传8张")
      }else{
        // 此时可以自行将文件上传至服务器
        console.log(file.file);
        console.log("https://thorleying.work/bbq/upload/"+file.file.name)
        let formData = new FormData();
        formData.append("file", file.file);
        axios({
          url:'https://thorleying.work/bbq/uploadImg.php',
          method:"post",
          data: formData,
        }).then(async res => {
          console.log(res.data)
          // alert('文件上传成功')
          await insertBanner(`https://thorleying.work/bbq/upload/${file.file.name}`)
          // state.img="https://thorleying.work/bbq/upload/"+flag;
          await getBannerData()
        })
      }
    };

    return{
      getBannerData,
      consoleData,
      ...toRefs(state),
      openDelete,
      delBanner,
      afterRead
    }
  }
}
</script>

<style scoped>
*{
  margin: 10px;
}
.banner{
  width: 240px;
  height: 150px;
  /*background: red;*/
  float: left;
  position: relative;
}
.delete{
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>