<template>
    <router-view @nextStep="onNextStep" @prevStep="onPrevStep" @sendData="onSendData" :steps="steps"></router-view>
</template>

<script lang="ts">
import { pipe } from "fp-ts/es6/pipeable";
import * as O from "fp-ts/es6/Option";
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";

@Component
export default class CanHelpView extends Vue {
    steps = {} as Partial<Step.Dict>;

    onNextStep(step: Step) {
        this.steps[step.type] = step;
        const path = pipe(Step.nextPath(step), O.toUndefined);
        path && this.$router.push({ path });
    }

    onPrevStep(step: Step) {
        const path = pipe(Step.prevPath(step), O.toUndefined);
        path && this.$router.push({ path });
    }

    onSendData(step: Step) {
        pipe(
            // { ...this.steps }, TODO: conenct to forms,
            {
                contact: Step.Contact({
                    name: "Janusz",
                    surname: "Waliglowa",
                    city: "Kraków",
                    street: "Mikołaja Kopernika",
                    building: "1",
                    email: "halko@gg.pl",
                    phone: "123"
                }),
                outlet: Step.Outlet({
                    mock: "Dajesz, dajesz nie przestajesz!"
                }),
                supply: Step.Supply({
                    mock: "Dajesz, dajesz nie przestajesz!"
                }),
                summary: Step.Summary({
                    comment: "ASAP !"
                })
            }
        )().then(ek => {
            // uncomment after merge - modal thank you
            // this.rxStore.action$.next(Actions.SHOW_THANK_YOU_MODAL());
            // this.$router.push({ path: "/" });
        });
    }
}
</script>
