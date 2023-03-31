<template>
  <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <a-spin :spinning="loading">
  <object-component v-if="dataList.length>0" :dataList="dataList"/>
  <van-empty v-else description="搜索结果为空" />
  </a-spin>
</template>

<script lang="ts">
import {searchObject} from "../../server/api/search";
import {useRoute} from "vue-router";
import {reactive, toRefs} from "vue";
import ObjectComponent from "../../components/objectComponent.vue";

export default {
  name: "index",
  components: {ObjectComponent},
  setup() {
    let state=reactive({
      dataList:[],
      loading:true
    })
    const route=useRoute()
    const onClickLeft = () => history.back();
    /**
     * 查询项目
     * */
    const searchObj=async () => {
      const {data} = await searchObject(route.query.searchVal)
      console.log(data,'输出查询的数据')
      state.dataList=data
      state.loading=false
    }
    searchObj()
    return {
      onClickLeft,
      ...toRefs(state)
    };
  },
}
</script>

<style scoped>

</style>