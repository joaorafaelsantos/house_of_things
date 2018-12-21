<template>
    <section class="section">
        <div class="container house-areas">
            <!-- No devices message -->
            <div v-if="devices && devices.length === 0">
                <h1>No connected devices.</h1>
                <img class="loading-animation" src="../assets/images/loading.svg" alt="Loading animation">

            </div>

            <!-- Devices -->
            <div v-if="devices && devices.length > 0">
                <div v-for="device in devices">
                    <div class="columns">
                        <!-- Light Device -->
                        <LightDevice v-if="device.specs.classifier === 'lamp'"
                                     :device-id=device.id
                                     :device-value="device.state.value"
                                     :device-power="device.state.power"
                                     :device-zone="device.zone">
                        </LightDevice>
                        <!-- AC Device -->
                        <ACDevice v-if="device.specs.classifier === 'ac'"
                                  :device-id=device.id
                                  :device-value="device.state.value"
                                  :device-power="device.state.power"
                                  :device-zone="device.zone">
                        </ACDevice>
                        <!-- Blind Device -->
                        <BlindDevice v-if="device.specs.classifier === 'blind'"
                                     :device-id=device.id
                                     :device-value="device.state.value"
                                     :device-power="device.state.power"
                                     :device-zone="device.zone">
                        </BlindDevice>
                        <!-- Humidity Device -->
                        <HumidityDevice v-if="device.specs.classifier === 'humidity'"
                                        :device-id="device.id"
                                        :device-value="device.state.value"
                                        :device-power="device.state.power"
                                        :device-zone="device.zone">
                        </HumidityDevice>
                        <!-- Temperature Device -->
                        <TemperatureDevice v-if="device.specs.classifier === 'temperature'"
                                           :device-id=device.id
                                           :device-value="device.state.value"
                                           :device-power="device.state.power"
                                           :device-zone="device.zone">
                        </TemperatureDevice>
                    </div>
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
                // device: {
                //     id: null,
                //     zone: null,
                //     specs: {
                //         type: null,
                //         category: null,
                //         classifier: null
                //     },
                //     state: {
                //         power: null,
                //         value: null
                //     }
                // }
            }
        },
        created() {

            // Create SignalR connection
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:5103/commsat")
                .build();

            // Store SignalR connection
            this.$store.commit('signalr/setConnection', connection)

            // Start SignalR connection
            connection.start().catch(err => console.error(err));

            // SignalR on connect
            // connection.on("onConnect", (message) => {
            //     this.devices.push(message)
            // });

            // SignalR on state changed
            connection.on("onStateChanged", (message) => {
                let deviceExists = false
                let device = message[0]
                let pos = 0
                console.log(device)
                for (let i = 0; i < this.devices.length; i++) {
                    if (this.devices[i].id === device.id) {
                        deviceExists = true;
                        pos = i
                        break;
                    }
                }
                if (!deviceExists) {
                    this.devices.push(device)
                } else if (deviceExists && device.specs) {
                    this.devices.splice(pos, 1);
                    this.devices.push(device)
                }
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
        padding: 1rem 0;
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