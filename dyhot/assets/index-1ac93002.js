import{a as d}from"./request-571d1387.js";import{r as _,u as f,t as h,_ as b,a as e,o as n,c as C,b as r,w as k,F as L,g as i}from"./index-4944d5d0.js";import{O as g}from"./objectComponent-6f782ba9.js";import"./index-0e66d560.js";const v=t=>d.request({url:"/searchObject.php",method:"POST",params:{searchVal:t}}),j={name:"index",components:{ObjectComponent:g},setup(){let t=_({dataList:[],loading:!0});const o=f(),s=()=>history.back();return(async()=>{const{data:a}=await v(o.query.searchVal);console.log(a,"输出查询的数据"),t.dataList=a,t.loading=!1})(),{onClickLeft:s,...h(t)}}};function y(t,o,s,c,a,O){const l=e("van-nav-bar"),p=e("object-component"),u=e("van-empty"),m=e("a-spin");return n(),C(L,null,[r(l,{title:"搜索结果","left-text":"返回","left-arrow":"",onClickLeft:c.onClickLeft},null,8,["onClickLeft"]),r(m,{spinning:t.loading},{default:k(()=>[t.dataList.length>0?(n(),i(p,{key:0,dataList:t.dataList},null,8,["dataList"])):(n(),i(u,{key:1,description:"搜索结果为空"}))]),_:1},8,["spinning"])],64)}const A=b(j,[["render",y]]);export{A as default};
