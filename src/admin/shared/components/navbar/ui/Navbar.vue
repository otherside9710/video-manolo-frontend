<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
                <span class="nav-link" v-if="role === 'ROLE_ADMIN'"> <router-link
                        to="/admin/">Dashboard</router-link></span>
                <span class="nav-link" v-if="role === 'ROLE_CLIENT'"> <router-link
                        to="/home/">Dashboard</router-link></span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active" v-if="role === 'ROLE_ADMIN'">
                        <span class="nav-link"> <router-link to="/admin/customer">Listar Clientes</router-link></span>
                    </li>
                    <li class="nav-item" v-if="role === 'ROLE_ADMIN'">
                        <span class="nav-link"> <router-link to="/admin/movie">Crear Pelicula</router-link></span>
                    </li>
                    <li class="nav-item" v-if="role === 'ROLE_CLIENT'">
                        <span class="nav-link"> <router-link to="/reservation">Mis Reserva</router-link></span>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-on:click="logout">Salir</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data: function () {
            return {
                role: ''
            };

        },
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push('/');
            }
        },
        beforeMount() {
            this.role = localStorage.getItem('role');
        }
    }
</script>

<style scoped>
    nav {
        background-color: #e3f2fd;
    }
</style>