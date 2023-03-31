import axios from "../request";

/**
 * 获取主页数据
 * */
export const getHomeData=()=>{
    return axios.request({
            url: '/getAllDouYinHot.php',
            method: "GET"
        }
    )
}
/*
* 获取具体的项目数据
*/
export const getDetailData=(param:any)=>{
    return axios.request({
            url: '/getDetailObj.php',
            method: "POST",
            params:{
              Id:param
            }
        }
    )
}
/*
* 更新具体的项目数据
*/
export const UpdateObjData=(param:any)=>{
    return axios.request({
            url: '/updateObj.php',
            method: "POST",
            params:{
                Id:param.Id,
                name:param.name,
                href:param.href,
                img:param.img
            }
        }
    )
}