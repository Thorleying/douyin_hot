import{a as h,g as x,u as D}from"./announcement-d0bb3f4d.js";import{g as E}from"./time-b2b908c3.js";import{q as F,y as C,r as I,t as M,m as d,_ as N,a as o,o as _,c as A,b as s,w as c,d as B,F as v,i as g,e as w,C as k,D as $}from"./index-4944d5d0.js";import"./request-571d1387.js";const V=F({setup(){const e=C([{title:"序号",key:"id",fixed:!0,width:100},{title:"发布时间",dataIndex:"time",fixed:!0,width:200},{title:"公告内容",dataIndex:"content"},{title:"操作",dataIndex:"operate",key:"operate",width:130,fixed:"right"}]);let n=I({announcement:null,modelAnnouncement:"",loading:!0}),u=C(!1);const r=()=>{u.value=!0},y=async()=>{const{data:t}=await h(n.modelAnnouncement,E());t===1?(d.success("公告发布成功"),n.modelAnnouncement="",u.value=!1,await l()):d.error("发布公告出错")},l=async()=>{const{data:t}=await x();n.announcement=t,n.loading=!1};l();const m=async t=>{if(t.show==="1")d.error("设置失败，当前就是主公告");else{const{data:f}=await D(t.Id);f===1&&(d.success("设置成功"),await l())}},p=()=>{r()};return{fixedColumns:e,...M(n),setMain:m,showModal:r,hideModal:y,visible:u,addAnnouncement:p}}});const O=B("h2",null," 公告管理 ",-1),S=["onClick"];function U(e,n,u,r,y,l){const m=o("a-button"),p=o("a-table"),t=o("a-spin"),f=o("a-textarea"),b=o("a-modal");return _(),A(v,null,[O,s(m,{type:"primary",onClick:e.addAnnouncement},{default:c(()=>[g("点击发布公告")]),_:1},8,["onClick"]),s(t,{spinning:e.loading},{default:c(()=>[s(p,{columns:e.fixedColumns,"data-source":e.announcement,pagination:!1,scroll:{x:2e3,y:500},bordered:""},{bodyCell:c(({column:a,record:i})=>[a.key==="id"?(_(),A(v,{key:0},[g(" 公告"+w(i.Id),1)],64)):k("",!0),a.key==="operate"?(_(),A("a",{key:1,onClick:q=>e.setMain(i),style:$({color:i.show==="1"?"red":""})},w(i.show==="1"?"当前为主公告":"设置主公告"),13,S)):k("",!0)]),_:1},8,["columns","data-source"])]),_:1},8,["spinning"]),B("div",null,[s(b,{visible:e.visible,"onUpdate:visible":n[1]||(n[1]=a=>e.visible=a),title:"添加公告","ok-text":"确认","cancel-text":"取消",onOk:e.hideModal},{default:c(()=>[s(f,{value:e.modelAnnouncement,"onUpdate:value":n[0]||(n[0]=a=>e.modelAnnouncement=a),placeholder:"请输入内容",rows:4},null,8,["value"])]),_:1},8,["visible","onOk"])])],64)}const G=N(V,[["render",U]]);export{G as default};
