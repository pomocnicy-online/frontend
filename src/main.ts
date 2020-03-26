import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueRx from "vue-rx";

Vue.config.productionTip = false;

Vue.use(VueRx);

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount("#app");
