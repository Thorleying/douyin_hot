import axios from "../request";
/**
 * 获取banner数据
 * */
export const randomTestApi=(param:any)=>{
    return axios.request({
            url: '/random.php',
            method: "POST",
            params:{
              getStr:param
            }
        }
    )
}