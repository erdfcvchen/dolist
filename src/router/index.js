import Vue from "vue";
import VueRouter from "vue-router";
// 设置路由烂加载
Vue.use(VueRouter);

 const list = () => import("../components/List");
 const TaskList = () => import("../components/list/TaskList");
// const loginInfo = () => import("../login/loginInfo.vue");
// const Home = () => import("../view/home.vue");
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "",
    redirect: "/list",
  },
  {
    path: "/list",
    component: list,
    children:[
        {
            path:"/",
            component:TaskList
        }
    ],
  },
];

const router = new VueRouter({
  routes,
});
export default router;
