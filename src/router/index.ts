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
        // name: "Necessitous",
        component: Necessitous
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
