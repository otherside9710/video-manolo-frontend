<template>
    <footer id="footer-total">
        <section class="footer-top">
            <p>Síguenos en nuestras redes sociales</p>
            <ul>
                <li><a href="#"><img src="/assets/images/rrss/twitter.svg" alt=""></a></li>
                <li><a href="#"><img src="/assets/images/rrss/facebook.svg" alt=""></a></li>
                <li><a href="#"><img src="/assets/images/rrss/linkedin.svg" alt=""></a></li>
                <li><a href="#"><img src="/assets/images/rrss/youtube.svg" alt=""></a></li>
                <li><a href="#"><img src="/assets/images/rrss/instagram.svg" alt=""></a></li>
            </ul>
        </section>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data: function () {
            return {
                flag: false
            }
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 480px) {

        footer ul li {
            margin: 0 !important;
            list-style: none !important;
        }

        footer ul li img {
            width: 100% !important;
            padding: 10px;
            margin: 0 !important;
        }

        .grid-4 h3 {
            font-weight: bold !important;
            font-size: 12px !important;
            margin-top: 20px !important;
        }

        .grid-4 p {
            font-size: 10px;
            margin: 0;
            max-width: 100%;
        }

        .footer-top {
            width: 100%;
        }

        .footer-top img {
            height: 30px;
        }
    }

    /*##################*/
    /*  Footer
    /*##################*/

    footer {
        padding: 50px 50px 80px 50px;
        color: #777;
        font-size: 16px;
        font-weight: 600;
        background: #000;
    }

    .footer-top p {
        margin-bottom: 10px;
        text-align: center;
        padding-bottom: 20px;
    }

    footer ul {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        padding: 0;
    }

    footer ul li {
        list-style: none !important;
        margin-left: -70px;
    }

    footer ul li a {
        display: inline-block !important;
    }

    footer ul li img {
        width: 55px;
        padding: 10px;
        margin-right: 90px;
    }

    footer h3 {
        margin-bottom: 10px;
        font-size: 20px;
        text-transform: uppercase;
    }
</style>
