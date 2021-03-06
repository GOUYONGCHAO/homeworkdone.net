import Vue from 'vue'
import Router from 'vue-router'
import login from '../store/modules/login'
Vue.use(Router)

const router = new Router({
  // 哈斯
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      // 文章列表
      path: '/',
      component(resolve) {
        require(['../views/article/list.vue'], resolve);
      }
    },
    {
      // 文章详情
      path: '/article/detail/:id',
      component(resolve) {
        require(['../views/article/detail.vue'], resolve);
      }
    },
    {
      // 关于我
      path: '/about',
      component(resolve) {
        require(['../views/about/index.vue'], resolve);
      }
    },
    {
      // 专栏
      path: '/book',
      component(resolve) {
        require(['../views/book/index.vue'], resolve);
      }
    }
    ,
    {
      // 登录
      path: '/login',
      name:'login',
      component(resolve) {
        require(['../views/login/index.vue'], resolve);
      }
    }
  ]
})


 
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
  let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
 
export default router;