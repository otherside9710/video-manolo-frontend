<template>
    <div>
        <br><br>
        <strong><h3>Reservaciones</h3></strong>
        <table class="table ">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Peliculas</th>
                <th scope="col">Estado</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Cliente</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, index) of reservations" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ data.id  }}</td>
                <td><span v-for="(movie, idx) of data.movies" :key="idx">
                    {{movie.title + (data.movies.length > 1 ? ',': '')}}
                </span></td>
                <td>{{ data.status[data.status.length-1] }}</td>
                <td>{{ data.subtotal }}</td>
                <td>{{ data.clientId.firstName +' '+ data.clientId.lastName}}</td>
                <td><a class="btn btn-primary btn-sm" v-on:click="update(data)">Actualizar</a></td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";

    export default {
        name: "Reservation",
        data: function () {
            return {
                reservations: []
            }
        },
        methods: {
            update: async function (to_update) {
                const self = this;
                to_update.status = ['RETURN'];
                await Axios.methods.PUT('/reservation/update', to_update)
                    .then(async (response) => {
                        Alert.methods.showAlert('success', 'Se ha actualizado la reserva correctamente', self);
                        console.log(response);
                    })
                    .catch(function (error) {
                        Alert.methods.showAlert('error', 'Ocurrio un error al cargar datos de Reservas, por favor intente de nuevo.', self);
                        console.log(error);
                        throw new Error(error);
                    });
            }
        },
        async beforeMount() {
            const self = this;
            await Axios.methods.GET('/reservation/findAll')
                .then(async (response) => {
                    self.reservations = response['data'];
                    console.log(response);
                })
                .catch(function (error) {
                    Alert.methods.showAlert('error', 'Ocurrio un error al cargar datos de Reservas, por favor intente de nuevo.', self);
                    console.log(error);
                    throw new Error(error);
                });
        }
    }
</script>

<style scoped>

</style>