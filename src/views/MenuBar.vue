<template>
    <div class="menu-area">
           <span class="icon">
                    <i class="mdi mdi-48px mdi-fire logo"></i>
                </span>
        <div class="time">
            <div class="subtitle has-text-white">
                {{ hours }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuBar",
        data() {
            return {
                hours: this.parsedHours()
            }
        },
        created() {
            setInterval(() => this.hours = this.parsedHours(), 1000 * 60)
        },
        methods: {
            parsedHours() {
                const date = new Date();
                let localeSpecificTime = date.toLocaleTimeString();
                return localeSpecificTime.replace(/:\d+ /, ' ');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/main.scss";

    .menu-area {
        padding-top: 30px;
        height: 80px;
    }

    .time {
        padding-top: 20px;
    }

    .logo {
        color: $pink;
    }

</style>