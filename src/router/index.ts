import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const router=createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/announcement',
            name: 'announcement',
            meta:{
                title:'公告'
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/announcement/index.vue')
        },
        {
            path: '/search',
            name: 'search',
            meta:{
                title:'搜索'
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/search/index.vue')
        },
        {
            path: '/home',
            name: 'home',
            meta:{
                title:'主页'
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/home/index.vue')
        },
        {
          path:"/admin-home",
          name:"admin-home",
          meta:{
              title: "管理员首页"
          },
            component:()=>import('../admin/adminLayout.vue'),
            children:[
                {
                    path: '/',
                    redirect: '/admin/work-space',
                },
                {
                    path: '/admin/work-space',
                    name: 'work-space',
                    meta:{
                        title:'首页-工作台',
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/workbench/workbench.vue')
                },
                {
                    path: '/admin/admin-user',
                    name: 'admin-user',
                    meta:{
                        title:'项目管理',
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/adminHome.vue')
                },
                {
                    path: '/admin/upload-obj',
                    name: 'upload-obj',
                    meta:{
                        title:'上传页面',
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/uploadObj.vue')
                },
                {
                    path: '/admin/admin-banner',
                    name: 'admin-banner',
                    meta:{
                        title:"主页轮播图设置",
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/adminBanner.vue')
                },
                {
                    path: '/admin/admin-information',
                    name: 'admin-information',
                    meta:{
                        title:"管理员个人信息设置",
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/adminInfo/adminInformation.vue')
                },
                {
                    path: '/admin/edit-obj',
                    name: 'edit-obj',
                    meta:{
                        title:"项目编辑",
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/editObj.vue')
                },
                {
                    path: '/admin/announcement-admin',
                    name: 'announcement-admin',
                    meta:{
                        title:"公告管理",
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/announcement/announcement.vue')
                },
                {
                    path: '/admin/table-test',
                    name: 'table-test',
                    meta:{
                        title:"表格测试",
                        require:true,
                        permission:true,
                        admin:true
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../admin/tableTest.vue')
                },
            ]
        },
        {
            path: '/admin/admin-login',
            name: 'admin-login',
            meta:{
                title:"管理员登录",
                require:true,
                admin:true
            },
            component: () => import(/* webpackChunkName: "about" */ '../admin/adminLogin.vue')
        },
        {
            path: '/504',
            name: '504',
            meta:{
                title:"暂不支持电脑端",
                require:true
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/504/index.vue')
        },
        {
            path: '/400',
            name: '400',
            meta:{
                title:"暂不支持手机端",
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/504/400.vue')
        },
        {
            path: '/404',
            name: '404',
            meta:{
                title:"当前页面不存在",
            },
            component: () => import(/* webpackChunkName: "about" */ '../pages/404/index.vue')
        },
    ]

})
/**
 * 判断移动端
 * */
const isMobile=()=> {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}
router.beforeEach((to, from, next) => {
    //  if (to.matched.length===0){
    //     next('/404')
    //     console.log('不触怒在')
    // }if ((to.meta.admin)){
    //      if (isMobile()){
    //          next('/400')
    //      }else{
    //          next()
    //      }
    //  }
      if (to.meta.permission) {
         if (!sessionStorage.getItem('token')&&!sessionStorage.getItem('user')) {
             next('/admin/admin-login')
         } else {
             next()
         }
      }else if (to.matched.length===0){
          next('/404')
          console.log('不触怒在')
      }else if ((to.meta.admin)){
           if (isMobile()){
               next('/400')
           }else{
               next()
           }
       }
      else{
          next()
      }
})
router.afterEach((to,from)=>{
    // @ts-ignore
    document.title = to.meta.title;
})
export default router
