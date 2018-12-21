<template>
    <div class="column area mb-3">
        <p class="subtitle has-text-white">AC :: <span class="has-text-medium-dark">{{deviceZone}}</span></p>
        <p class="subtitle ac-value">
            <span class="icon ac-controller" @click="changeAC('decrease', showToast)">
                <i class="mdi mdi-36px mdi-code-less-than"></i>
            </span> {{value}}ºC <span class="icon ac-controller" @click="changeAC('increase', showToast)">
                <i class="mdi mdi-36px mdi-code-greater-than"></i>
            </span>
        </p>
    </div>
</template>

<script>
    import {toastManager} from "../../mixins/shared/toastManager";

    export default {
        name: "ACDevice",
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
                value: parseInt(this.deviceValue)
            }
        },
        methods: {
            changeAC(type, showToast) {
                const handleChange = (value) => {
                    const message = `AC was changed to ${value}ºC `
                    showToast(message)
                }

                if (type === 'decrease' && this.value > 16) {
                    this.value = this.value - 1
                    handleChange(this.value)
                } else if (type === 'increase' && this.value < 30) {
                    this.value = this.value + 1
                    handleChange(this.value)
                }

                const newState = {
                    id: this.deviceId,
                    state: {
                        value: this.value.toString(),
                        power: this.devicePower
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

    .ac-value {
        color: $green;
        font-size: 2rem !important;
    }

    .ac-controller {
        margin: 0px 5px 0px 5px;
    }

</style>