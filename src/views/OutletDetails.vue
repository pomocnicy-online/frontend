<template>
    <outlet-details :id="$route.params.id" />
</template>

<script>
    import { Component, Vue } from "vue-property-decorator";
    import OutletDetails from '@/components/OutletDetails'

    @Component({
        components: {
            OutletDetails
        }
    })
    export default class OutletDetailsView extends Vue {}
</script>

<style lang="scss" scoped>
</style>
