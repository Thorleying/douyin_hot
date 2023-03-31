export function getNowDate() {
    let myDate = new Date;
    let year = myDate.getFullYear(); //获取当前年
    let mon = myDate.getMonth() + 1; //获取当前月
    let date = myDate.getDate(); //获取当前日
    let hours = myDate.getHours(); //获取当前小时
    let minutes = myDate.getMinutes(); //获取当前分钟
    let seconds = myDate.getSeconds(); //获取当前秒
    let now = year + "年" + mon + "月" + date + "日" + hours + ":" + minutes + ":" + seconds;
    return now;
}