<template>
  <van-nav-bar title="抖音热门代码">
    <template #right>
     <router-link to="/announcement">
       <van-icon name="bullhorn-o" size="18"/>
     </router-link>
    </template>
  </van-nav-bar>
  <van-search v-model="searchValue" placeholder="点击搜索的内容" @search="onSearch"/>
  <van-notice-bar
      v-show="announcement.show==='1'"
      color="#1989fa"
      background="#ecf9ff"
      mode="closeable"
      left-icon="volume-o"
      :text="`公告:${announcement.content}`"
  />
  <van-swipe style="width: 90%;height: 160px;margin: auto" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banner" :key="item.Id"><img :src="item.img" alt="" style="width: 100%;height: 150px"> </van-swipe-item>
  </van-swipe>
  <a-spin :spinning="loading">
  <object-component :dataList="dataList"/>
<!--  <div class="girds">-->
<!--    <span v-for="item in dataList " :key="item.Id">-->
<!--      <img :src="item.img" alt="">-->
<!--      {{ item.name }}-->
<!--      <van-button class="btn" type="success" size="small" @click="getLook(item)">点击预览</van-button>-->
<!--      <van-button class="btn" type="danger" size="small"  @click="copy(item.href)">复制链接</van-button>-->
<!--    </span>-->
<!--  </div>-->
  </a-spin>
  <div class="block"></div>
</template>
<script lang="ts">
import {reactive, toRefs} from "vue";
import useClipboard from "vue-clipboard3";
import { getHomeData } from "../../server/api/getHomeData";
import {useRouter} from "vue-router";
import {getBanner} from "../../server/api/Banner";
import {getAnnouncement} from "../../server/api/announcement";
import {message} from "ant-design-vue";
import ObjectComponent from "../../components/objectComponent.vue";
export default {
  components: {ObjectComponent},
  setup(){
    const router=useRouter()
    const { toClipboard } = useClipboard();
    // const VanNotify = Notify.Component;
    let state=reactive({
      dataList:[],
      banner:[],
      //搜索内容
      searchValue:"",
      announcement:{
        content:"",
        show:""
      },
      loading:true
    })
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
    /**
     * 获取所有数据库的东西
     * */
    const getAllData=async () => {
      const {data} = await getHomeData();
      console.log(data,'获取数据')
      state.dataList=data
      state.loading=false
    }
    getAllData()
    /**
    * 判断移动端
    * */
    const isMobile=()=> {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
    if (isMobile()) {
      router.replace('/home');
    } else {
      router.replace('/504');
    }
    /**
    * 获取banner 数据
    * */
    const getBannerData=async () => {
      const {data} = await getBanner();
      console.log(data,'输出data')
      state.banner=data
    }
    getBannerData()
    /**
     * 点击进行搜索
     * */
    const onSearch = (val) => {
      console.log("点击触发");
      router.push({
        name:'search',
        query:{
          searchVal:val
        }
      })
    }
    /**
     * 获取所有的公告数据
     * */
    const getData=async () => {
      const {data} = await getAnnouncement()
      console.log(data,'获取所有的公告数据')
      data.map((item:any)=>{
        if (item.show==='1'){
          state.announcement=item
        }
      })
      console.log(state.announcement,'输出')
    }
    getData()
    return{
      ...toRefs(state),
      getLook,
      copy,
      getAllData,
      getBannerData,
      onSearch,
      getData
    }
  }
}
</script>

<style scoped>
body{
  width: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  margin-top: 10px;
}
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
.block{
  width: 100%;
  height:20px;
}
</style>
