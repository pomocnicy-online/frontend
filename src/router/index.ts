import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import { Step as NecessitousStep } from "@/views/Necessitous/Step.ts";
import Necessitous from "@/views/Necessitous/Necessitous.vue";
import NecessitousContact from "@/views/Necessitous/Contact.vue";
import NecessitousDemand from "@/views/Necessitous/Demand.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/potrzebujacy",
        name: "Necessitous",
        component: Necessitous,
        children: [
            {
                path: "1",
                component: NecessitousContact
            },
            {
                path: "2",
                component: NecessitousDemand
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
