<template>
  <div class="login-box">
    <div class="login-logo">
      <p align="center">
        <img src="https://pic4.zhimg.com/80/v2-021986aee317f4be6849dbe8a9fbaca7_qhd.jpg" style="width: 50px">
      </p>
      <h1 class="mb-0 ml-2 text-3xl font-bold">抖音热门代码后台管理登录</h1>
    </div>
    <a-form layout="horizontal"
            :model="formState"  name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">
      <a-form-item
         name="username"
         :rules="[{ required: true, message: '请输入账号!' }]"
      >
        <a-input  size="large" placeholder="账号" v-model:value="formState.username" >
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item
          name="password"
         :rules="[{ required: true, message: '请输入密码!' }]">
        <a-input

            size="large"
            type="password"
            placeholder="密码"
            autocomplete="new-password"
            v-model:value="formState.password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large"  block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<script lang="ts">

import {message} from "ant-design-vue";
import {LockOutlined,UserOutlined} from "@ant-design/icons-vue";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
import {reactive} from "vue";
import {adminLogin} from "../server/api/login";
import {useRouter} from "vue-router";
interface loginInt{
  username:string,
  password:string
}
class login implements loginInt{
  username:"";
  password:"";
}
export default {
  name: "adminLogin",
  components:{
    LockOutlined,
    UserOutlined
  },
  setup(){
    const router=useRouter()
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: false,
    });
    /**
     * 点击登录
     * */
    const loginSub=async () => {

    }
    const onFinish = async (values: any) => {
      if (!values.username || !values.password) {
        message.warning("必填选项不为空")
      } else {
        const {data} = await adminLogin(values)
        if (data === 1) {
          message.success("登陆成功")
          sessionStorage.setItem('user', formState.username)
          sessionStorage.setItem('token', "isLoginState")
          await router.push('/admin/work-space')
        } else {
          message.error("登陆失败")
        }
      }
    };

    const onFinishFailed = (errorInfo: any) => {
     console.log("必选项填写和勾选",errorInfo)
    };
    return{
      loginSub,
      formState,
      onFinish,
      onFinishFailed,
    }
  }
}
</script>

<style scoped lang="less">
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 200px;
  //background: url('@/assets/login.svg');
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .svg-icon {
      font-size: 48px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
.login{
  width: 500px;
  height: 300px;
  /*background: red;*/
  /*border: saddlebrown 1px dashed;*/
  margin:150px auto;
  text-align: center;
}
.layout{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
}
</style>