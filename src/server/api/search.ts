import axios from "../request";
/**
 * 查询项目
 * */
export const searchObject=(nameParam:any)=>{
    return axios.request({
            url: '/searchObject.php',
            method: "POST",
            params:{
                searchVal:nameParam,
            }
        }
    )
}