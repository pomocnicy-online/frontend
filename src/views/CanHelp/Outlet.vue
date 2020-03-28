<template>
    <div class="step-single">
        <section>
            <v-container>
                <step-header name="Wybierz placówkę" current="2" outOf="4" />
                <article class="step-desc step-table">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left"></th>
                                    <th class="text-left">Szpital</th>
                                    <th class="text-left">Zapotrzebowanie</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in outlets" :key="item.name">
                                    <td>
                                        <v-checkbox v-model="checkbox"></v-checkbox>
                                    </td>
                                    <td>
                                        <div>
                                            <strong>{{ item.legalName }}</strong>
                                        </div>
                                        <div>
                                            {{ item.city }}, ul. {{ item.street }} {{ item.buildingNumber }}
                                            {{ item.apartmentNumber && `/ ${item.apartmentNumber}` }}
                                        </div>
                                    </td>
                                    <td class="step-table__supplies">
                                        <div>
                                            maseczki:
                                            <strong>{{ item.maskRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            rekawiczki:
                                            <strong>{{ item.gloveRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            kombinezony:
                                            <strong>{{ item.suitRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            zakupy ?:
                                            <strong>{{ item.groceryRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            plyny dezynfekujące:
                                            <strong>{{ item.disinfectionMeasureRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            inne dezynfekujące materialy:
                                            <strong>{{ item.otherCleaningMaterialRequestsTotalCount }}</strong>
                                        </div>
                                        <div>
                                            print request ?
                                            <strong>{{ item.printRequestsTotalCount }}</strong>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </article>
                <!-- render list of supplies here @seba -->
                <v-row class="step-nav">
                    <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                    <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script lang="ts">
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Emit } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        StepHeader
    }
})
export default class CanHelpOutlet extends Vue {
    outlet = { mock: "" };
    outlets = [];
    path = "/api/requests/";

    async mounted() {
        this.outlets = await this.getAllOutlets();
    }

    getAllOutlets() {
        return fetch(this.path, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
    }

    @Emit("nextStep")
    onNext(): Step.Outlet {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Outlet {
        return this.step();
    }

    private step = () => Step.Outlet({ ...this.outlet });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-single;
@include step-nav;
@include step-desc;

.step-table {
    td {
        padding: 14px;
    }

    &__supplies {
        color: $accent;
    }
}
</style>
