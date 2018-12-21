<template>
    <div class="column area mb-3">
        <p class="subtitle has-text-white">Humidity</p>
        <p class="subtitle humidity-value">
            {{value}}% <span class="icon">
                    <i class="mdi mdi-36px mdi-water-percent"></i>
                    </span>
        </p>
    </div>
</template>

<script>
    import {toastManager} from "../../mixins/shared/toastManager";

    export default {
        name: "HumidityDevice",
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

    .humidity-value {
        color: $blue;
        font-size: 2rem !important;
    }

</style>