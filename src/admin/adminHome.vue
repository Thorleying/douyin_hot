<template>
  <keep-alive>
    <div>
      <h1>管理员主页</h1>
      <!--  <router-link to="/upload-obj">-->
      <a-button type="primary" @click="openModelState">
        <template #icon><upload-outlined /></template>
        点击上传项目
      </a-button>
      <!--  </router-link>-->
      <a-spin :spinning="loading">
        <a-table :columns="columns" :data-source="tableLists" :scroll="{ x: 1400, y:400 }">
          <template #bodyCell="{ column,record }">
            <template v-if="column.key === 'operation'">
              <a @click="edit(record)">点击编辑</a>
              <a style="padding-left:10px"  @click="del(record.Id)">点击删除</a>
              <a :href="record.href" target="_blank"><a style="margin-left:10px">点击预览</a></a>
            </template>
            <template v-else-if="column.key === 'img'">
              <img :src="record.img" style="width:80px">
            </template>
          </template>
        </a-table>
      </a-spin>
      <div>
        <a-modal
            v-model:visible="visible"
            title="Modal"
            ok-text="确认"
            cancel-text="取消"
            @ok="hideModal"
        >
          <p style="text-align: center">
            <van-uploader  v-if="!img" :after-read="afterRead"/>
            <img :src="img" alt="" style="width:150px;height: 150px" v-else><br>
          </p>
          <p>
            <a-input placeholder="请输入标题" v-model:value="name"/>
          </p>
          <p>
            <a-input placeholder="请输入链接"  v-model:value="href"/>
          </p>
        </a-modal>
      </div>
    </div>
  </keep-alive>
</template>

<script lang="ts" >
import {createVNode, onBeforeMount, reactive, ref, toRefs} from "vue";
import {getHomeData} from "../server/api/getHomeData";
import {addObj, delObj} from "../server/api/operate";
import router from "../router";
import {getInfo} from "../server/api/getUserInfo";
import {useRouter} from "vue-router";
import type { TableColumnsType } from 'ant-design-vue';
import {ExclamationCircleOutlined, UploadOutlined} from '@ant-design/icons-vue';
import {useStore} from "vuex";
import {message, Modal} from "ant-design-vue";
import axios from "axios";
import {getNowDate} from "../hooks/time";
interface DataItem {
  Id: string;
  name: string;
  href: string;
  img: string;
  time:string;
}
export default {
  name: "adminHome",
  components:{
    UploadOutlined
  },
  setup(){
    const store=useStore()
    let visible = ref<boolean>(false);
    const columns: TableColumnsType = [
      { title: '序号', width: 50, dataIndex: 'Id', key: 'name', fixed: 'left' },
      { title: '二维码', dataIndex: 'img', key: 'img',width:80 },
      { title: '名称', dataIndex: 'name', key: 'name',width:80 },
      { title: '链接', dataIndex: 'href', key: 'href',width:150 },
      { title: '上传时间', dataIndex: 'time', key: 'time',width:200 },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width:180
      },
    ];
    const router=useRouter()
    let state=reactive({
      tableLists:[],
      loading:true,
      img:"",
      name:"",
      href:""
    })
    const getTableData=async () => {
      const {data} = await getHomeData();
      state.tableLists = data
      state.loading=false
    }

    /**
    * 点击删除
    * */
    const del=async (objId: any) => {
      if (confirm("是否删除这个内容")){
        const {data}=await delObj(objId);
        console.log(data)
        if (data===1){
          alert('删除成功')
          await getTableData()
        }
      }else{
        alert('取消成功')
      }
    }
    getTableData()
    /**
    * 点击进入edit 界面
    * */
    const edit=(i:any)=>{
      router.push({
        name:"edit-obj",
        query:{
          editDataId:i.Id
        }
      })
    }
    /**
     * 点击控制openModel
     * */
    const openModelState=()=>{
      console.log("打开弹窗")
      // store.commit('openModel',true)
      visible.value=true
      console.log("更改弹窗状态",store.state.openModelState)
    }
    /**
     * 模态框的展示和关闭
     **/
    const showModal = () => {
      visible.value = true;
    };
    const hideModal = async () => {
      const obj = {name: state.name, href: state.href, img: state.img, time: getNowDate()}
      console.log(obj)
      const {data} = await addObj(obj);
      console.log(data, '输出状态')
      if (data === 1) {
        message.success('添加成功')
      }
       await getTableData()
      visible.value = false;
    };
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
      getTableData,
      del,
      edit,
      columns,
      openModelState,
      visible,
      showModal,
      hideModal,
      confirm,
      afterRead
    }
  }
}
</script>

<style scoped>
/**{*/
/*  margin: 10px;*/
/*}*/
/*.admin{*/
/*  width: 100%;*/
/*  border: solid 1px rosybrown;*/
/*}*/
.nowAdmin{
  position: absolute;
  right:140px;
  top:0;
}
.logout{
  position: absolute;
  right: 0;
  top:10px;
}
</style>