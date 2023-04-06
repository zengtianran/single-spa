import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerApplication, start } from "single-spa";

Vue.config.productionTip = false;

const loadScript = async (url: string) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const subAppPrefix = "http://localhost:10000";
registerApplication(
  "vueApp",
  // 通常搭配import动态导入使用
  async () => {
    // 加载js
    await loadScript(subAppPrefix + "/js/chunk-vendors.js");
    await loadScript(subAppPrefix + "/js/app.js");
    // 子应用中导出的libraryTarget
    return (window as any).singleVue
  },
  (location) => location.pathname.startsWith("/vue"),
  // 自定义参数,传递给子应用
  (name, location)=> {
    return {
      authToken: '8888',
      name,
      location
    }
  }
);
start();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
