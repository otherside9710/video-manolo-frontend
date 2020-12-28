<template>
    <div>
        <br><br>
        <strong><h3>Clientes</h3></strong>
        <table class="table ">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Email</th>
                <th scope="col">Rut</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) of users" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user['first-name'] || ''}}</td>
                <td>{{ user['last-name'] || ''}}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.rut }}</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";

    export default {
        name: "TableUser",
        data: function() {
            return {
                users: [],

            };
        },
        async mounted() {
            const self = this;
            await Axios.methods.GET('/user/findAll')
                .then(async (response) => {
                    self.users = response['data'];
                    console.log(response);
                })
                .catch(function (error) {
                    Alert.methods.showAlert('error', 'Ocurrio un error al cargar datos de usuario, por favor intente de nuevo.', self);
                    console.log(error);
                    throw new Error(error);
                });
        }

    }
</script>

<style scoped>

</style>