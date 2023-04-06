import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入singleSpaVue
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
// 包裹vue
const appOptions = {
  el: "#vue",
  router,
  store,
  render: (h) => h(App),
};
// 如果被父级应用引用
if(window.singleSpaNavigate){
  __webpack_public_path__ = 'http://localhost:10000/'
}
// 非子应用中，能正常加载子应用
if (!window.singleSpaNavigate) {
  delete appOptions.el;
  new Vue(appOptions).$mount("#app");
}
const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});
// 导出钩子函数
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = (props)=> {
  // 来至父应用的自定义数据
  console.log(props)
  return vueLifeCycle.mount(props)
};
export const unmount = vueLifeCycle.unmount;
// 需要父应用加载子应用
// 导出钩子 bootstrap mount unmount
// single-spa single-spa-vue
