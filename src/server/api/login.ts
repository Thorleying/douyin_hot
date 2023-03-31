import axios from "../request";

/**
 * 管理员登录
 * */
export const adminLogin=(param:any)=>{
    return axios.request({
            url: '/login.php',
            method: "POST",
            params:{
              username:param.username,
              password:param.password
            }
        }
    )
}