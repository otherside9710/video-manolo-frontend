<template>
    <div>
        <strong><h3>Peliculas</h3></strong>
        <table class="table ">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Actores</th>
                <th scope="col">Directores</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(movie, index) of movies" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ movie.title }}</td>
                <td>{{ movie.generalDescription }}</td>
                <td>{{ (movie.actorList ? movie.actorList.join(', '): '') }}</td>
                <td>{{ (movie.directors ? movie.directors.join(', '): '') }}</td>
                <td>{{ movie.quantity }}</td>
                <td>{{ movie.price }}</td>
                <td><a class="btn btn-primary btn-sm" v-on:click="toUpdate(movie.id)">Actualizar</a></td>
            </tr>

            </tbody>
        </table>
        <br>
    </div>
</template>

<script>
    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";

    export default {
        name: "TableMovie",
        data: function() {
            return {
                movies: [],

            };
        },
        methods: {
            toUpdate(movieId) {
                this.$router.push({path: '/admin/movie/update/'+ movieId, params: {id: movieId}});
            }
        },
        async mounted() {
            const self = this;
            await Axios.methods.GET('/movie/findAll')
                .then(async (response) => {
                    self.movies = response['data'];
                    console.log(response);
                })
                .catch(function (error) {
                    Alert.methods.showAlert('error', 'Ocurrio un error al crear la cuenta, por favor intente de nuevo.', self);
                    console.log(error);
                    throw new Error(error);
                });
        }
    }
</script>

<style scoped>

</style>