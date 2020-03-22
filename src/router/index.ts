import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Necessitous from "../views/Necessitous.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/potrzebujacy/:step",
        name: "Necessitous",
        component: Necessitous
    }
];

const router = new VueRouter({
    routes
});

export default router;
