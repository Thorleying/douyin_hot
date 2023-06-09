
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        alert('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
        if (res.data.message) alert(res.data.message)
        if (res.data.resultCode === 416) {
            alert('跳回登录login')
        }

        return Promise.reject(res.data)
    }
    return res.data
})

export default axios
