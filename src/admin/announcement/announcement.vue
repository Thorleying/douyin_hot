<template>
  <h2>公告管理</h2>
  <a-button type="primary" @click="addAnnouncement">点击发布公告</a-button>
  <a-spin :spinning="loading">
  <a-table
      :columns="fixedColumns"
      :data-source="announcement"
      :pagination="false"
      :scroll="{ x: 2000, y: 500 }"
      bordered
  >
    <template #bodyCell="{ column,record }">
      <template v-if="column.key === 'id'">
        公告{{record.Id}}
      </template>
      <template v-if="column.key === 'operate'">
      <a @click="setMain(record)" :style="{color:record.show==='1'?'red':''}">{{record.show==='1'?'当前为主公告':'设置主公告'}}</a>
      </template>
    </template>
  </a-table>
  </a-spin>
  <div>
    <a-modal
        v-model:visible="visible"
        title="添加公告"
        ok-text="确认"
        cancel-text="取消"
        @ok="hideModal"
    >
      <a-textarea v-model:value="modelAnnouncement" placeholder="请输入内容" :rows="4" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import {defineComponent, reactive, ref, toRefs} from 'vue';
import { addAnnouncements, getAnnouncement, updateAnnouncement} from "../../server/api/announcement";
import {message} from "ant-design-vue";
import {getNowDate} from "../../hooks/time";
import {addObj} from "../../server/api/operate";

export default defineComponent({
  setup() {
    const fixedColumns = ref<TableColumnsType>([
      {
        title: '序号',
        key: 'id',
        fixed: true,
        width: 100,
      },
      {
        title: '发布时间',
        dataIndex: 'time',
        fixed: true,
        width: 200,
      },
      {
        title: '公告内容',
        dataIndex: 'content',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key:'operate',
        width: 130,
        fixed: 'right',
      },
    ]);
    let state=reactive({
      announcement:null,
      //模态框中 textarea的数据
      modelAnnouncement:"",
      loading:true
    })
    /**
    * 模态框数据
    * */
    let visible = ref<boolean>(false);
    const showModal = () => {
      visible.value = true;
    };
    const hideModal = async () => {
      const {data}=await addAnnouncements(state.modelAnnouncement,getNowDate())
      if (data===1){
        message.success('公告发布成功')
        state.modelAnnouncement=""
        visible.value = false;
        await getData()
      }
      else{
        message.error('发布公告出错')
      }
    };
    /**
     * 获取所有的公告数据
     * */
    const getData=async () => {
      const {data} = await getAnnouncement()
      state.announcement=data
      state.loading=false
    }
    getData()
    /**
     * 设置为主公告
     * */
    const setMain=async (i: any) => {
      if (i.show === '1') {
        message.error('设置失败，当前就是主公告')
      } else {
        const {data} = await updateAnnouncement(i.Id)
        if (data===1){
          message.success('设置成功')
          await getData()
        }
      }
    }
    /**
     * 点击发布公告
     * */
    const addAnnouncement=()=>{
      showModal()
    }
    return {
      fixedColumns,
      ...toRefs(state),
      setMain,
      showModal,
      hideModal,
      visible,
      addAnnouncement
    };
  },
});
</script>
<style>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme='dark'] #components-table-demo-summary tfoot th,
[data-theme='dark'] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>
