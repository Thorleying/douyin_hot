import{g as m}from"./announcement-d0bb3f4d.js";import{r as u,t as f,_ as v,a,o as h,c as b,b as n,w as s,F as g,d as _,e as k,p as x,f as y}from"./index-4944d5d0.js";import"./request-571d1387.js";const C={setup(){let t=u({announcements:[]});const c=()=>history.back(),o=async()=>{const{data:e}=await m();console.log(e,"获取所有的公告数据"),t.announcements=e};return o(),{...f(t),onClickLeft:c,getData:o}}};const w=t=>(x("data-v-40d343ab"),t=t(),y(),t),I={href:"javascript:;"},D=w(()=>_("div",{class:"block"},null,-1));function L(t,c,o,e,S,B){const l=a("van-nav-bar"),r=a("a-list-item-meta"),d=a("a-list-item"),p=a("a-list");return h(),b(g,null,[n(l,{title:"公告","left-text":"返回","left-arrow":"",onClickLeft:e.onClickLeft},null,8,["onClickLeft"]),n(p,{"item-layout":"horizontal","data-source":t.announcements,style:{width:"90%",margin:"auto"}},{renderItem:s(({item:i})=>[n(d,null,{default:s(()=>[n(r,{description:i.time},{title:s(()=>[_("a",I,k(i.content),1)]),_:2},1032,["description"])]),_:2},1024)]),_:1},8,["data-source"]),D],64)}const E=v(C,[["render",L],["__scopeId","data-v-40d343ab"]]);export{E as default};
