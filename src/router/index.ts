import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Supply from "../views/Supply.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/kontakt",
        name: "Kontakt",
        component: Supply
    }
];

const router = new VueRouter({
    routes
});

export default router;
