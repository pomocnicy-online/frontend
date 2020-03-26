import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import { Step as NecessitousStep } from "@/views/Necessitous/Step.ts";
import Necessitous from "@/views/Necessitous/Necessitous.vue";
import NecessitousContact from "@/views/Necessitous/Contact.vue";
import NecessitousDemand from "@/views/Necessitous/Demand.vue";
import NecessitousSummary from "@/views/Necessitous/Summary.vue";

import { Step as CanHelpStep } from "@/views/CanHelp/Step.ts";
import CanHelp from "@/views/CanHelp/CanHelp.vue";
import CanHelpContact from "@/views/CanHelp/Contact.vue";

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
                path: NecessitousStep.Paths.Contact,
                component: NecessitousContact
            },
            {
                path: NecessitousStep.Paths.Demand,
                component: NecessitousDemand
            },
            {
                path: NecessitousStep.Paths.Summary,
                component: NecessitousSummary
            }
        ]
    },
    {
        path: "/pomagajacy",
        name: "Canhelp",
        component: CanHelp,
        children: [
            {
                path: CanHelpStep.Paths.Contact,
                component: CanHelpContact
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
