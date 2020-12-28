<template>
    <header id="header">
        <nav>
            <figure>
                <a :href="home">
                    <img src="/assets/images/video-manolo-logo.png" alt="">
                </a>
                <p style="text-align: right; color: #ffff; margin-top: -40px">#VideoManolo</p>
            </figure>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Head",
        data: function(){
            return {
                home: '/'
            }
        }
    }
</script>

<style scoped>
    header {
        padding: 30px 20px 11px 20px;
        background: #000;
    }

    header a {
        display: inline-block;
    }

    figure {
        margin: 0;
    }

    img {
        max-width: 100%;
        height: 35px;
        -ms-interpolation-mode: bicubic;
        display: inline-block;
        vertical-align: middle;
    }
</style>
