<template>
    <div class="step-single">
        <section>
            <v-container>
                <step-header name="Wybierz placówkę" current="2" outOf="4" />
                <v-row>
                    <v-col class="d-flex" cols="6" xs="6" md="3">
                        <v-select v-model="selectedTown" :items="towns" label="Miasto"></v-select>
                    </v-col>
                </v-row>
                <article class="step-desc step-table">
                    <v-radio-group v-model="outlet.request.requestId">
                        <v-row class="step-table__row-container d-none d-sm-flex">
                            <v-col cols="2" md="1"></v-col>
                            <v-col cols="10" md="5">Szpital</v-col>
                            <v-col cols="10" md="6">Zapotrzebowanie</v-col>
                        </v-row>

                        <div
                            class="step-table__row-container"
                            v-for="item in filteredOutlets"
                            :key="item.name"
                        >
                            <v-row>
                                <v-col cols="2" md="1">
                                    <v-radio :key="item.id" :value="item.id"></v-radio>
                                </v-col>
                                <v-col class="offset-md-0" cols="10" md="5">
                                    <div>
                                        <strong>{{ item.legalName }}</strong>
                                    </div>
                                    <div>
                                        {{ item.city }}, ul. {{ item.street }} {{ item.buildingNumber }}
                                        {{ item.apartmentNumber && `/ ${item.apartmentNumber}` }}
                                    </div>
                                </v-col>
                                <v-col
                                    class="step-table__supplies offset-2 offset-md-0"
                                    cols="10"
                                    md="6"
                                >
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
                                </v-col>
                            </v-row>
                        </div>
                    </v-radio-group>
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

import { Component, Vue, Emit, Watch, Prop } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        StepHeader
    }
})
export default class CanHelpOutlet extends Vue {
    outlet: Step.OutletData = {
        request: [
            {
                requestId: 35,
                name: "XD"
            }
        ]
    };
    outlets = [];
    filteredOutlets = [];
    towns = ["Wszystkie"];
    selectedTown = "";
    path = "/api/requests/";
    outletRequest = null;

    @Prop()
    steps!: Step.Dict;

    @Watch("steps", { immediate: true })
    onStepsChange(steps: Partial<Step.Dict>) {
        if (steps.outlet) {
            this.outlet = steps.outlet.data as Step.OutletData;
        }
    }

    @Watch("outlets", { immediate: true })
    onOutletsChange(outlets: any) {
        this.towns = [...this.towns, ...outlets.map((outlet: any) => outlet.city)];
    }

    @Watch("selectedTown", { immediate: true })
    onTownsChange(selectedTown: any) {
        if (selectedTown === "Wszystkie") {
            this.filteredOutlets = this.outlets;
        } else {
            this.filteredOutlets = this.outlets.filter((outlet: any) => outlet.city === selectedTown);
        }
    }

    async mounted() {
        this.outlets = await this.getAllOutlets();
        this.filteredOutlets = this.outlets;
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
        return Step.Outlet({ ...this.outlet });
    }

    @Emit("prevStep")
    onPrev(): Step.Outlet {
        return Step.Outlet({ ...this.outlet });
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-single;
@include step-nav;
@include step-desc;

.step-table {
    height: 65vh;
    overflow-x: hidden;
    overflow-y: auto;
    &__row-container {
        border-bottom: 1px solid #bebbbb;
    }

    td {
        padding: 14px;
    }

    &__supplies {
        color: $accent;
    }
}
</style>
