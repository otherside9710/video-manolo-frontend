<template class="home">
    <div id="app">
        <Head></Head>
        <transition name="router-anim" enter-active-class="animated fadeInDown"
                    leave-active-class="animated fadeOutDown">
            <RouterView>
            </RouterView>
        </transition>
        <div class="showbox" id="spinner" style="display: none">
            <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Head from "./components/partials/Head";
    import Footer from "./components/partials/Footer";

    export default {
        name: "app",
        components: {Footer, Head}
    };
</script>

<style scoped>
    @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css";

    .showbox {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 5%;
        position: fixed;
    }

    .loader {
        position: relative;
        margin: 0px auto;
        width: 100px;
    }

    .loader:before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .circular {
        -webkit-animation: rotate 2s linear infinite;
        animation: rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }

    @-webkit-keyframes color {
        100%, 0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%, 90% {
            stroke: #ffa700;
        }
    }

    @keyframes color {
        100%, 0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%, 90% {
            stroke: #ffa700;
        }
    }
</style>
