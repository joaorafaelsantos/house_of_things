<template>
    <div class="column area mb-3">
        <p class="subtitle has-text-white">Blinds :: <span class="has-text-medium-dark">{{deviceZone}}</span></p>
        <span class="icon blind" @click="toggleBlinds(showToast)">
                    <i class="mdi mdi-48px mdi-blinds" :class="isOpened ? 'blinds-on' : ''"></i>
        </span>
    </div>
</template>

<script>
    import {toastManager} from "../../mixins/shared/toastManager";

    export default {
        name: "BlindDevice",
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
            },
            deviceZone: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                isOpened: this.devicePower ? 'On' : 'Off'
            }
        },
        methods: {
            toggleBlinds(showToast) {
                let message
                this.isOpened = !this.isOpened

                if (this.isOpened) {
                    message = `Blind is opened!`
                } else {
                    message = `Blind is closed!`
                }

                showToast(message)

                const newState = {
                    id: this.deviceId,
                    state: {
                        value: this.deviceValue,
                        power: this.isOpened ? 'On' : 'Off'
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

    .blinds-on {
        color: $light-pink;
    }

</style>