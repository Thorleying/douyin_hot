import axios from "../request";
/**
 * 获取banner数据
 * */
export const getBanner=()=>{
    return axios.request({
            url: '/getBanner.php',
            method: "GET"
        }
    )
}
/**
* 插入添加 banner 数据
* */
export const insertBanner=(parma:any)=>{
    return axios.request({
            url: '/insertBanner.php',
            method: "POST",
            params:{
              img:parma
            }
        }
    )
}
/**
* 删除 banner 数据
* */
export const deleteBanner=(parma:any)=>{
    return axios.request({
            url: '/delBanner.php',
            method: "POST",
            params:{
                Id:parma
            }
        }
    )
}