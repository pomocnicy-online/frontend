import Vue from "vue";
import VueRx from "vue-rx";

import vuetify from "@/plugins/vuetify";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueRx);

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount("#app");
