import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";

import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

import ArrowNext from "@/components/icons/arrow-next.vue";
import ArrowBack from "@/components/icons/arrow-back.vue";
import VoiceIcon from "@/components/icons/voice.vue";
import HeartIcon from "@/components/icons/heart.vue";
import PeopleIcon from "@/components/icons/people.vue";
import CarIcon from "@/components/icons/car.vue";
import { messages } from "@/translation/translation";

Vue.use(Vuetify);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "pl",
    messages
});

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.cyan.darken1,
                accent: colors.grey.base
            }
        }
    },
    icons: {
        values: {
            nextArrow: {
                component: ArrowNext
            },
            backArrow: {
                component: ArrowBack
            },
            voiceIcon: {
                component: VoiceIcon
            },
            heartIcon: {
                component: HeartIcon
            },
            peopleIcon: {
                component: PeopleIcon
            },
            carIcon: {
                component: CarIcon
            }
        }
    },
    lang: {
        t: (key: string, ...params: Array<string | number>) => String(i18n.t(key, params))
    }
};

export default new Vuetify(opts);
