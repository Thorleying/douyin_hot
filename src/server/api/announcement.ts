import axios from "../request";
/**
 * 获取所有公告数据
 * */
export const getAnnouncement=()=>{
    return axios.request({
            url: '/getAnnouncement.php',
            method: "GET"
        }
    )
}
/**
 * 更改主公告
 * */
export const updateAnnouncement=(param:any)=>{
    return axios.request({
            url: '/updateAnnouncement.php',
            method: "POST",
            params:{
              Id:param
            }
        }
    )
}
/**
 * 添加公告
 * */
export const addAnnouncements=(content:string,time:any)=>{
    return axios.request({
            url: '/addAnnouncement.php',
            method: "POST",
            params:{
                content:content,
                time:time
            }
        }
    )
}