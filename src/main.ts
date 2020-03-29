import Vue from "vue";
import VueRx from "vue-rx";

import vuetify from "@/plugins/vuetify";
import { Supply } from "@/views/Supply";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueRx);

Vue.prototype.$typeName = Supply.typeName;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount("#app");
