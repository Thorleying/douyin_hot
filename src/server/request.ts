
import axios from 'axios'
import {message} from "ant-design-vue";
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost/douyinhot' : 'http://localhost/douyinhot'
axios.interceptors.response.use((res:any) => {
    console.log(res.status,'输出状态吗')
    if (res.status===200){
        return res
    }
    message.error('网络请求失败')
},error => {
    message.error('网络超时')
})
export default axios