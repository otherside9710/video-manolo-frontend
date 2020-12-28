<template>
    <div class="jumbotron">
        <div class="container">
            <img src="/assets/images/video-manolo-logo-white.png" alt="">
            <h2>Video Manolo</h2>
            <div class="box">
                <form action="#" method="POST" v-on:submit="submit">
                    <input v-model="email" class="form-control" type="email" placeholder="email" required>
                    <input v-model="password" class="form-control" type="password" placeholder="password" required>
                    <button type="submit" class="btn btn-outline-success full-width">Iniciar Sesion</button>
                    <br>
                    <br>
                    <span>No tienes cuenta? Crea una <router-link to="/signup">Aquí.</router-link></span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from "../../app/ui/components/Alert/Alert";
    import Axios from "../../app/services/axios/Axios";

    export default {
        name: "Login",
        data: function () {
            return {
                email: '',
                password: '',
            }
        },

        beforeMount: function() {
            if (localStorage.getItem('role')) {
                this.redirectByRole(localStorage.getItem('role'));
            }
        },
        methods: {
            submit: async function (e) {
                e.preventDefault();
                const self = this;
                const credentials = {
                    grant_type: 'password',
                    username: this.email,
                    password: this.password
                };

                await Axios.methods.POST('/oauth/token', credentials)
                    .then(async (response) => {
                        Alert.methods.showAlert('success', 'Bienvenido!', self);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('login', 'valid');
                        localStorage.setItem('role', response.data.user.role);
                        localStorage.setItem('movieList', []);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        console.log(response);
                        self.redirectByRole(response.data.user.role);
                    })
                    .catch(function (error) {
                        Alert.methods.showAlert('warning', 'Credenciales Incorrectas, por favor intente de nuevo.', self);
                        console.log(error);
                        throw new Error(error);
                    });
            },
            cleanForm: function () {
                this.email = '';
                this.password = '';
            },

            redirectByRole: function (roleUser) {
                const ROLE_ADMIN = "ROLE_ADMIN";
                if (ROLE_ADMIN === roleUser) {
                    this.$router.push('/admin');
                    return;
                }
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .jumbotron {
        text-align: center;
        width: 30rem;
        border-radius: 0.5rem;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 4rem auto;
        background-color: #fff;
        padding: 2rem;
    }

    input {
        width: 100%;
        margin-bottom: 1.4rem;
        padding: 1rem;
        background-color: #ecf2f4;
        border-radius: 0.2rem;
        border: none;
    }

    h2 {
        margin-bottom: 3rem;
        font-weight: bold;
        color: #ababab;
    }

    .btn {
        border-radius: 0.2rem;
    }

    .full-width {
        width: 100%;
        -webkit-border-top-right-radius: 0;
        -webkit-border-bottom-right-radius: 0;
        -moz-border-radius-topright: 0;
        -moz-border-radius-bottomright: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .box {
        bottom: 0;
        left: 0;
        margin-bottom: 3rem;
        margin-left: 3rem;
        margin-right: 3rem;
    }
</style>