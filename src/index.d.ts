import Vue from "vue";
import { Supply } from "@/views/Supply";

declare module "vue/types/vue" {
    interface Vue {
        $typeName: typeof Supply.typeName;
    }
}
