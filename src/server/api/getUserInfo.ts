import axios from "../request";

/**
 * 管理员登录
 * */
export const getInfo=(param:any)=>{
    return axios.request({
            url: '/getInfo.php',
            method: "POST",
            params:{
                username:param,
            }
        }
    )
}