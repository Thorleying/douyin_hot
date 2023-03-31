<template>
  <van-nav-bar
      title="公告"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <a-list item-layout="horizontal" :data-source="announcements" style="width: 90%;margin: auto">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
            :description="item.time"
        >
          <template #title>
            <a href="javascript:;">{{ item.content }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div class="block"></div>
</template>

<script lang="ts">
import {getAnnouncement} from "../../server/api/announcement";
import {onMounted, reactive, toRefs} from "vue";
import {ECharts, EChartsOption, init} from "echarts";

export default {
  setup() {
    let state=reactive({
      announcements:[]
    })
    const onClickLeft = () => history.back();
    const getData=async () => {
      const {data} = await getAnnouncement()
      console.log(data,'获取所有的公告数据')
      state.announcements=data
    }
    getData()
    return {
      ...toRefs(state),
      onClickLeft,
      getData
    };
  },
};
</script>

<style scoped>
*{
  margin-top: 5px;
}
.block{
  height: 50px;
}
</style>