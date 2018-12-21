<template>
    <div class="column area mb-3">
        <p class="subtitle has-text-white">Light</p>
        <span class="icon lamp" @click="toggleLight(showToast)">
                    <i class="mdi mdi-48px" :class="isOn ? 'lamp-on mdi-lightbulb-on' : 'mdi-lightbulb'"></i>
        </span>
    </div>
</template>

<script>
    import {toastManager} from "../../mixins/shared/toastManager";

    export default {
        name: "Light",
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
                isOn: this.devicePower ? 'On' : 'Off'
            }
        },
        methods: {
            toggleLight(showToast) {
                let message
                this.isOn = !this.isOn

                if (this.isOn) {
                    message = `Light is on!`
                } else {
                    message = `Light is off!`
                }

                showToast(message)

                const newState = {
                    Id: this.deviceId,
                    State: {
                        Value: this.deviceValue,
                        Power: this.isOn ? 'On' : 'Off'
                    }
                }
                console.log(newState)
                this.$store.getters['signalr/getConnection'].invoke("onSetState", newState).catch(err => console.error(err));


            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/main.scss";

    .lamp-on {
        color: $yellow;
    }

</style>