import{u as j,l as v,r as y,t as F,_ as g,a as p,o as l,c as h,d,i,b as m,g as b,w as _,p as E,f as k}from"./index-4944d5d0.js";import{a as B,U as N}from"./getHomeData-12411199.js";import"./request-571d1387.js";const I={name:"editObj",setup(){const e=j(),a=v();let t=y({obj:{Id:"",name:"",href:"",img:""},isNotEdit:!0});const s=async()=>{const{data:o}=await B(e.query.editDataId);console.log(o,"输出具体id数据"),t.obj={...t.obj,...o[0]}};s();const r=()=>{t.isNotEdit=!1},c=async()=>{t.isNotEdit=!0;let o={Id:t.obj.Id,name:t.obj.name,href:t.obj.href,img:t.obj.img};console.log(o,"输出更改后的数据");const{data:n}=await N(o);n===1&&(alert("修改成功,3s后返回主页"),await s(),setTimeout(()=>{a.push("/admin-user")},3e3))};return{...F(t),getParam:s,edit:r,save:c}}};const f=e=>(E("data-v-3dc01f6e"),e=e(),k(),e),w=f(()=>d("h1",null,"项目编辑页面",-1)),D=["src"],C={class:"inputs"},O=f(()=>d("br",null,null,-1));function U(e,a,t,s,r,c){const o=p("a-input"),n=p("a-button");return l(),h("div",null,[w,d("img",{src:e.obj.img,alt:"",style:{width:"200px"}},null,8,D),d("div",C,[i(" 名称："),m(o,{type:"text",value:e.obj.name,"onUpdate:value":a[0]||(a[0]=u=>e.obj.name=u),disabled:e.isNotEdit},null,8,["value","disabled"]),O,i(" 链接："),m(o,{type:"text",value:e.obj.href,"onUpdate:value":a[1]||(a[1]=u=>e.obj.href=u),disabled:e.isNotEdit},null,8,["value","disabled"])]),e.isNotEdit?(l(),b(n,{key:0,type:"primary",onClick:s.edit},{default:_(()=>[i("点击编辑")]),_:1},8,["onClick"])):(l(),b(n,{key:1,onClick:s.save,type:"primary",danger:""},{default:_(()=>[i("点击保存")]),_:1},8,["onClick"]))])}const V=g(I,[["render",U],["__scopeId","data-v-3dc01f6e"]]);export{V as default};