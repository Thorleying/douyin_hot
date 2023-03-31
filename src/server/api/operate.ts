import axios from "../request";
/**
 * 增加项目
 * */
export const addObj=(obj:any)=>{
    return axios.request({
            url: '/addObj.php',
            method: "POST",
            params:{
                name:obj.name,
                href:obj.href,
                img:obj.img,
                time:obj.time
            }
        }
    )
}
/**
 * 删除项目
 * */
export const delObj=(param:any)=>{
    return axios.request({
            url: '/delObj.php',
            method: "POST",
            params:{
              objId:param
            }
        }
    )
}