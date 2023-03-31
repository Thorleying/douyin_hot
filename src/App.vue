<template>
<router-view/>
</template>
<script lang="ts">
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";

export default {
  name:'App',
  setup(){
    const router=useRouter()
    const isMobile=()=> {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
    // if (isMobile()) {
    //   router.replace('/home');
    // } else {
    //   router.replace('/504');
    // }
    /**
     * 禁止copy操作
     * */
    // document.addEventListener('copy',function (e){
    //   e.preventDefault()
    //   message.error('静止复制')
    // })
    return {
      isMobile
    }
  }
}
</script>

<style scoped>

</style>
