import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import { Paths as NecessitousPaths } from "@/modules/Necessitous/Step";
import Necessitous from "@/modules/Necessitous/Necessitous.vue";
import NecessitousContact from "@/modules/Necessitous/Contact.vue";
import NecessitousDemand from "@/modules/Necessitous/Demand.vue";
import NecessitousSummary from "@/modules/Necessitous/Summary.vue";

import { Paths as CanHelpPaths } from "@/modules/CanHelp/Step";
import CanHelp from "@/modules/CanHelp/CanHelp.vue";
import CanHelpContact from "@/modules/CanHelp/Contact.vue";
import CanHelpOutlet from "@/modules/CanHelp/Outlet.vue";
import CanHelpSupply from "@/modules/CanHelp/Supply.vue";
import CanHelpSummary from "@/modules/CanHelp/Summary.vue";

import NotFound from "@/components/NotFound.vue";
import TermsOfService from "@/components/TermsOfService.vue";
import Contact from "@/views/Contact.vue";
import OutletDetails from "@/views/OutletDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Pomocnicy",
      metaTags: [
        {
          name: "description",
          content: "Pomagamy placówkom medycznym w walce z COVID-19.",
        },
        {
          property: "og:description",
          content: "Pomagamy placówkom medycznym w walce z koronawirusem",
        },
        {
          property: "og:title",
          content: "Pomocnicy - pomagamy placówkom medycznym w walce z koronawirusem",
        },
      ],
    },
  },
  {
    path: "/potrzebujacy",
    name: "Necessitous",
    component: Necessitous,
    children: [
      {
        path: NecessitousPaths.Contact,
        component: NecessitousContact,
      },
      {
        path: NecessitousPaths.Demand,
        component: NecessitousDemand,
      },
      {
        path: NecessitousPaths.Summary,
        component: NecessitousSummary,
      },
    ],
  },
  {
    path: "/pomagajacy",
    name: "Canhelp",
    component: CanHelp,
    children: [
      {
        path: CanHelpPaths.Contact,
        component: CanHelpContact,
      },
      {
        path: CanHelpPaths.Outlet,
        component: CanHelpOutlet,
      },
      {
        path: CanHelpPaths.Supply,
        component: CanHelpSupply,
      },
      {
        path: CanHelpPaths.Summary,
        component: CanHelpSummary,
      },
    ],
  },
  {
    path: "/placowka/:id",
    component: OutletDetails,
    meta: {
      title: "Placówka",
      metaTags: [
        {
          name: "description",
          content: "something",
        },
      ],
    },
  },
  {
    path: "/regulamin",
    component: TermsOfService,
  },
  {
    path: "/kontakt",
    component: Contact,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
