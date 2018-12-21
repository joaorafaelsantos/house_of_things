<template>
    <div class="column area mb-3">
        <p class="subtitle has-text-white">Temperature</p>
        <p class="subtitle temperature-value">
            {{value}}ºC <span class="icon">
                    <i class="mdi mdi-36px mdi-thermometer"></i>
                    </span>
        </p>
    </div>
</template>

<script>
    import {toastManager} from "../../mixins/shared/toastManager";

    export default {
        name: "TemperatureDevice",
        mixins: [toastManager],
        props: {
            deviceId: {
                type: String,
                required: true
            },
            deviceValue: {
                type: String,
                required: true
            },
            devicePower: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                value: this.deviceValue
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/main.scss";

    .temperature-value {
        color: $pink;
        font-size: 2rem !important;
    }

</style>