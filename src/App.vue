<template>
    <div id="app">
        <MenuBar></MenuBar>
        <HouseAreas></HouseAreas>
        <router-view/>

        <br>

    </div>
</template>

<script>
    import MenuBar from './views/MenuBar'
    import HouseAreas from './views/HouseAreas'

    export default {
        components: {
            MenuBar,
            HouseAreas
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/main";

    @import url('https://fonts.googleapis.com/css?family=Poppins');

    html, body {
        min-height: 100vh;
        min-width: 100vw;
        background-color: $dark-grey !important;
    }

    body {

    }

    #app {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $white;
    }
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: $blue;
            &.router-link-exact-active {
                color: $dark-blue;
                text-decoration: underline;
            }
        }
    }

    /* Custom style */

    .button {
        padding: .8rem 1.8rem .8rem 1.8rem;
        margin: .2rem .2rem .2rem .2rem;
        font-family: inherit;
        font-size: 1rem;
        cursor: pointer;
        border-radius: .2rem;
    }

    .button-light {
        background-color: #DFDFDF;
    }

    .button:hover {
        opacity: .7;
    }
</style>

