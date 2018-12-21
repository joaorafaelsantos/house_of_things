<template>
    <section class="section">
        <div class="container house-areas">
            <!-- No devices message -->
            <div v-if="devices && devices.length === 0">
                <h1>No connected devices.</h1>
                <img class="loading-animation" src="../assets/images/loading.svg" alt="Loading animation">

            </div>

            <!-- Devices -->
            <div v-for="device in devices">
                <!-- Zone -->
                <h1 class="title has-text-left">{{ device.Zone }}</h1>
                <div class="columns">
                    <!-- Light Device -->
                    <LightDevice v-if="device.Specs.Classifier === 'lamp'"
                                 :device-id=device.Id
                                 :device-value="device.State.Value"
                                 :device-power="device.State.Power">
                    </LightDevice>
                    <!-- AC Device -->
                    <ACDevice v-if="device.Specs.Classifier === 'ac'"
                              :device-id=device.Id
                              :device-value="device.State.Value"
                              :device-power="device.State.Power">
                    </ACDevice>
                    <!-- Blind Device -->
                    <BlindDevice v-if="device.Specs.Classifier === 'blind'"
                                 :device-id=device.Id
                                 :device-value="device.State.Value"
                                 :device-power="device.State.Power">
                    </BlindDevice>
                    <!-- Humidity Device -->
                    <HumidityDevice v-if="device.Specs.Classifier === 'humidity'"
                                    :device-id="device.Id"
                                    :device-value="device.State.Value"
                                    :device-power="device.State.Power">
                    </HumidityDevice>
                    <!-- Temperature Device -->
                    <TemperatureDevice v-if="device.Specs.Classifier === 'temperature'"
                                       :device-id=device.Id
                                       :device-value="device.State.Value"
                                       :device-power="device.State.Power">
                    </TemperatureDevice>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ACDevice from '../components/Devices/ACDevice'
    import BlindDevice from '../components/Devices/BlindDevice'
    import LightDevice from '../components/Devices/LightDevice'
    import HumidityDevice from '../components/Devices/HumidityDevice'
    import TemperatureDevice from '../components/Devices/TemperatureDevice'

    const signalR = require("@aspnet/signalr");

    export default {
        name: 'HouseAreas',
        components: {
            ACDevice,
            BlindDevice,
            LightDevice,
            HumidityDevice,
            TemperatureDevice
        },
        data() {
            return {
                devices: [],
                device: {
                    Id: null,
                    Zone: null,
                    Specs: {
                        Type: null,
                        Category: null,
                        Classifier: null
                    },
                    State: {
                        Power: null,
                        Value: null
                    }
                }
            }
        },
        created() {

            // Create SignalR connection
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/commsat")
                .build();

            // Store SignalR connection
            this.$store.commit('signalr/setConnection', connection)

            // Start SignalR connection
            connection.start().catch(err => console.error(err));

            // SignalR on connect
            connection.on("onConnect", (message) => {
                this.devices.push(message)
            });

            // SignalR on state changed
            connection.on("onStateChanged", (message) => {
                this.devices.push(message)
            });
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

    .loading-animation {
        padding-top: 16%;
    }


</style>