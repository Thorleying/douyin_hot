<template>
  <a-layout style="width: 100%;min-width: 1024px">
    <a-layout-sider v-model:collapsed="collapsed"  style="height: 100vh;min-height:900px" :trigger="null" collapsible>
      <div class="logo" >
        <h2><img src="../assets/vue.svg" v-show="collapsed">{{ collapsed?"":"后台管理" }}</h2>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <router-link to="/admin/work-space">
          <a-menu-item key="/admin/work-space">
            <robot-outlined />
            <span>首页-工作台</span>
          </a-menu-item>
        </router-link>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
             <desktop-outlined />
              <span>网站管理</span>
            </span>
          </template>
          <router-link to="/admin/admin-user">
          <a-menu-item key="/admin/admin-user">项目数据</a-menu-item>
          </router-link>
          <router-link to="/admin/upload-obj">
          <a-menu-item key="/admin/upload-obj">上传项目</a-menu-item>
          </router-link>
          <router-link to="/admin/admin-banner">
          <a-menu-item key="/admin/admin-banner">轮播图</a-menu-item>
          </router-link>
          <router-link to="/admin/announcement-admin">
          <a-menu-item key="/admin/announcement-admin">公告管理</a-menu-item>
          </router-link>
        </a-sub-menu>
        <router-link to="/admin/admin-information">
          <a-menu-item key="/admin/admin-information">
            <user-outlined />
            <span>管理员个人设置</span>
          </a-menu-item>
        </router-link>
        <router-link to="/admin/table-test">
          <a-menu-item key="/admin/table-test">
            <upload-outlined />
            <span>数据库操作</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-dropdown>
        <span class="nowAdmin">
          <a-avatar :size="35">
            <template #icon><img src="https://buqiyuan.gitee.io/img/logo.jpg" alt="前端范范"/></template>
          </a-avatar>
          当前管理员:{{nowAdminInfo.nickname}}
        </span>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="logout">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', maxHeight: '680px',overflow:'scroll' }"
      >
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" >
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RobotOutlined,
  DesktopOutlined
} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref, toRefs, watch,provide, nextTick} from 'vue';
import {useRoute,onBeforeRouteUpdate,useRouter} from "vue-router";
import {getInfo} from "../server/api/getUserInfo";
export default defineComponent({
  name: "adminHome",
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RobotOutlined,
    DesktopOutlined
  },
  setup(){
    const router = useRouter()
    const route=useRoute()
    let state=reactive({
      listRouteKey:"/admin-user",
      // 当前管理员
      nowAdminInfo:{
        username:"",
        password:"",
        nickname:""
      },
    })
    console.log(route.path);
    /**
    * 观察路由变化
    * */
    onBeforeRouteUpdate((to) => {
      console.log('onBeforeRouteUpdate',to.path);
      state.listRouteKey=to.path
    });
    watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
      console.log('watch',newValue);
      state.listRouteKey=newValue
    },{ immediate: true })
    /**
     * 获取当前登录用户的数据
     * */
    const getAdmin=async () => {
      const {data} = await getInfo(sessionStorage.getItem("user"))
      console.log(data[0],'输出当前管理员数据');
      state.nowAdminInfo=data[0]
    }
    getAdmin()
    /**
     * 点击退出登录
     * */
    const logout=()=>{
      router.push('/admin/admin-login');
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
    /**
     * 控制滑块不滑动
     * */
    document.body.style.overflow='hidden'
    return{
      ...toRefs(state),
      selectedKeys: ref<string[]>([state.listRouteKey]),
      collapsed: ref<boolean>(false),
      getAdmin,
      logout,
    }
  }
})
</script>

<style scoped>
body{
  overflow-y: hidden
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  /*background: rgba(255, 255, 255, 0.3);*/
  margin: 16px;
}
.logo img{
  vertical-align: middle;
}
.logo h2{
  color:white;
  text-align: center;
}
.site-layout .site-layout-background {
  background: #fff;
}
.nowAdmin{
  position: absolute;
  right: 50px;
  cursor: pointer;
}
</style>