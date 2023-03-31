import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import 'vant/lib/index.css';
import Vant from 'vant/es'
import 'vant/es/notify/style';
import router from './router'
import store from './store/index'
// import { Button,NavBar, Swipe, Dialog,SwipeItem, Grid, GridItem } from 'vant';
createApp(App).use(Vant).use(router).use(store).use(Antd).mount('#app')
