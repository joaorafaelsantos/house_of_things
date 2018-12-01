<template>
    <section class="section">
        <div class="container house-areas">
            <!-- Zone 1 -->
            <h1 class="title has-text-left">Zone 1
                <span class="icon" @click="toggleVisibility(0)">
                    <i class="mdi mdi-24px"
                       :class="isHide ? 'mdi-plus-circle-outline' : 'mdi-minus-circle-outline'"></i>
                </span>
            </h1>
            <div class="columns" v-show="!isHide">
                <div class="column area">
                    <p class="subtitle has-text-white">Lights</p>
                    <span class="icon lamp" @click="turnOff('Lights')">
                    <i class="mdi mdi-48px" :class="isOn ? 'lamp-on mdi-lightbulb-on' : 'mdi-lightbulb'"></i>
                    </span>
                </div>
                <div class="column area">
                    <p class="subtitle has-text-white">AC</p>
                    <p class="subtitle ac-value">
                        <span class="icon ac-controller" @click="changeAC('decrease')">
                    <i class="mdi mdi-36px mdi-code-less-than"></i>
                    </span> {{acValue}}ºC <span class="icon ac-controller" @click="changeAC('increase')">
                    <i class="mdi mdi-36px mdi-code-greater-than"></i>
                    </span></p>
                </div>
                <div class="column area">
                    <p class="subtitle has-text-white">Temperature</p>
                    <p class="subtitle temperature-value">
                        {{temperatureValue}}ºC <span class="icon">
                    <i class="mdi mdi-36px mdi-thermometer"></i>
                    </span>
                    </p>
                </div>
            </div>

            <!-- Zone 2-->
            <h1 class="title has-text-left">Zone 2
                <span class="icon" @click="toggleVisibility(1)">
                    <i class="mdi mdi-24px"
                       :class="isHide ? 'mdi-plus-circle-outline' : 'mdi-minus-circle-outline'"></i>
                </span>
            </h1>
            <div class="columns">
                <div class="column area">
                    <p class="subtitle has-text-white">Humidity</p>
                    <p class="subtitle humidity-value">
                        {{humidityValue}}% <span class="icon">
                    <i class="mdi mdi-36px mdi-water-percent"></i>
                    </span>
                    </p>
                </div>
                <div class="column area">
                    <p class="subtitle has-text-white">Blinds</p>
                    <span class="icon lamp" @click="turnOff('Blinds')">
                    <i class="mdi mdi-48px mdi-blinds" :class="isOn ? 'blinds-on' : ''"></i>
                    </span>
                </div>
            </div>

            <!-- Zone 3-->
            <h1 class="title has-text-left">Zone 3</h1>
            <div class="columns">
                <div class="column area">
                    <p class="subtitle has-text-white">Humidity</p>
                    <p class="subtitle humidity-value">
                        {{humidityValue}}% <span class="icon">
                    <i class="mdi mdi-36px mdi-water-percent"></i>
                    </span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HouseAreas',
        data() {
            return {
                isHide: false,
                isOn: true,
                acValue: 25,
                temperatureValue: 21,
                humidityValue: 91
            }
        },
        methods: {
            toggleVisibility(index) {
                this.isHide = !this.isHide
            },
            turnOff(type) {
                this.isOn = !this.isOn
                let message
                if (this.isOn) {
                    message = `${type} are on!`
                } else {
                    message = `${type} are off!`
                }
                this.showToast(message)
            },
            changeAC(type) {
                if (type === 'decrease') {
                    this.acValue--
                } else {
                    this.acValue++
                }
                const message = `AC was changed to ${this.acValue}ºC `
                this.showToast(message)
            },
            showToast(message) {
                this.$toast.open({
                    message: message,
                    position: 'is-bottom'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/main.scss";

    .house-areas {
        padding-top: 10px;
    }

    .house-areas > .columns:not(:last-child) {
        padding-bottom: 50px;
    }

    .area {
        margin: 5px 15px 20px 15px;
        border-radius: 10px;
        background-color: $medium-grey;
        color: $white;
        padding: 5rem 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    }

    .area:hover {
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        cursor: pointer;
    }

    .area > .subtitle {
        padding-bottom: 30px;
    }

    .title {
        color: $white !important;
    }

    .icon:hover {
        cursor: pointer;
    }

    .lamp-on {
        color: $yellow;
    }

    .ac-value {
        color: $green;
        font-size: 2rem !important;
    }

    .ac-controller {
        margin: 0px 5px 0px 5px;
    }

    .temperature-value {
        color: $pink;
        font-size: 2rem !important;
    }

    .humidity-value {
        color: $blue;
        font-size: 2rem !important;
    }

    .blinds-on {
        color: $light-pink;
    }

</style>