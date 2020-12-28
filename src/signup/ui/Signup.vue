<template>
    <div class="jumbotron">
        <div class="container">
            <img src="/assets/images/video-manolo-logo-white.png" alt="">
            <h2>Video Manolo</h2>
            <div class="box">
                <form action="#" method="POST" v-on:submit="submit">
                    <input v-model="firstName" type="text" class="form-control" placeholder="Nombre" required>
                    <input v-model="lastName" type="text" class="form-control" placeholder="Apellido" required>
                    <input v-model="email" type="email" class="form-control" placeholder="Email" required>
                    <input v-model="rut" v-on:change="validateRut" type="text" class="form-control"
                           placeholder="Rut: XXXXXXXX-X" required>
                    <input v-model="phone" type="text" class="form-control" placeholder="Celular" required>
                    <input v-model="password" v-on:change="onchangePass" type="password" class="form-control"
                           placeholder="Contraseña" required>
                    <input v-model="confirmPassword" v-on:change="onchangePass" type="password" class="form-control"
                           placeholder="Confirmar Contraseña" required>
                    <button id="btn_create" type="submit" class="btn btn-outline-success full-width">Crear Cuenta
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from "../../app/ui/components/Alert/Alert";
    import Axios from "../../app/services/axios/Axios";

    export default {
        name: "Signup",
        data: function () {
            return {
                firstName: '',
                lastName: '',
                email: '',
                rut: '11376192-k',
                phone: '',
                password: '',
                confirmPassword: ''
            }
        },
        methods: {
            submit: async function (e) {
                e.preventDefault();
                const self = this;
                const save_data = {
                    name: this.firstName,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    rut: this.rut,
                    phone: this.phone,
                    password: this.password,
                    role: 'ROLE_CLIENT'
                };

                await Axios.methods.POST('/user/save', save_data)
                    .then(async (response) => {
                        Alert.methods.showAlert('success', 'Su cuenta se ha creado correctamente!', self);
                        self.cleanForm();
                        console.log(response);
                    })
                    .catch(function (error) {
                        Alert.methods.showAlert('error', 'Ocurrio un error al crear la cuenta, por favor intente de nuevo.', self);
                        console.log(error);
                        throw new Error(error);
                    });
            },
            onchangePass: function () {
                if (this.password && this.confirmPassword) {
                    if (this.password !== this.confirmPassword) {
                        this.password = '';
                        this.confirmPassword = '';
                        Alert.methods.showAlert('warning', 'Las contraseñas no coinciden, por favor intente de nuevo.', this)
                    }
                }
            },
            cleanForm: function () {
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.rut = '';
                this.phone = '';
                this.password = '';
                this.confirmPassword = '';
            },
            validateRut: function () {
                if (!this.isValidRut(this.rut)) {
                    this.rut = '';
                    Alert.methods.showAlert('warning', 'El RUT digitado no es valido.', this)
                }
            },
            isValidRut: function (completeRut) {
                // validate the rut with string complete format "XXXXXXXX-X"
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(completeRut))
                    return false;
                const tmp = completeRut.split('-');
                let digv = tmp[1];
                const rut = tmp[0];
                if (digv == 'K') digv = 'k';
                return (this.dv(rut) == digv);
            },
            dv: function (T) {
                let M = 0, S = 1;
                for (; T; T = Math.floor(T / 10))
                    S = (S + T % 10 * (9 - M++ % 6)) % 11;
                return S ? S - 1 : 'k';
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