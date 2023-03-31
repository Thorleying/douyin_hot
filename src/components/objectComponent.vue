<template>
  <div class="girds">
    <span v-for="item in dataList" :key="item.Id">
      <img :src="item.img" alt="">
      {{ item.name }}
      <van-button class="btn" type="success" size="small" @click="getLook(item)">点击预览</van-button>
      <van-button class="btn" type="danger" size="small"  @click="copy(item.href)">复制链接</van-button>
    </span>
  </div>
</template>

<script lang="ts">
import {message} from "ant-design-vue";
import useClipboard from "vue-clipboard3";
export default {
  name: "objectComponent",
  props:{
    dataList:{default:null}
  },
  setup(){
    const { toClipboard } = useClipboard();
    /**
     * 点击预览
     * */
    const getLook=(item:any)=>{
      window.location.href=item.href;
    }
    /**
     * 点击复制
     * */
    let copy =  (text: any) => {
      toClipboard(text);
      message.success('成功复制，赶紧去分享吧');
    };
    return{
      getLook,
      copy
    }
  }
}
</script>

<style scoped>
.girds{
  width: 90%;
  /*background: red;*/
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.girds span{
  flex: 1;
  display: block;
  height: 230px;
  margin-top: 15px;
  margin-right: 5px;
  background: linear-gradient(blue, 10%,pink);
  text-align: center;
  width: calc((100% - 10px) / 2);
  min-width: calc((100% - 10px) /2);
  max-width: calc((100% - 10px) / 2);
}
.girds span img{
  width:70%;
  height:110px;
  max-width: 110px;
  display: block;
  margin:5px auto;
}
.btn{
  display: block;
  /*margin-top: 5px;*/
  margin:7px auto;
}
</style>