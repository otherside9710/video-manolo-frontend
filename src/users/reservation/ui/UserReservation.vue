<template>
    <div>
        <Navbar></Navbar>
        <div class="container mt-5 mb-5">
            <strong><h3>Mis Peliculas</h3></strong>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pelicula</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Precion Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(movie, index) of movieList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ movie.title }}</td>
                    <td>{{ status }}</td>
                    <td>{{ movie.price | currency }}</td>
                    <td>{{ movie.quantity }}</td>
                    <td>{{ (movie.quantity * movie.price) | currency}}</td>
                    <td><button type="button" class="btn btn-small btn-danger" >X</button></td>
                </tr>

                </tbody>
                <h4>Total: {{ subtotalGeneral | currency }}</h4>
                <input type="hidden" v-model="subtotal">
            </table>
            <button type="button" class="btn btn-block btn-success" v-on:click="saveReservation('RESERVATED')"
            >Guardar Reservacion</button>
        </div>
    </div>
</template>

<script>
    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";
    import Navbar from "../../../admin/shared/components/navbar/ui/Navbar";

    export default {
        name: "UserReservation",
        components: {Navbar},
        data: function () {
            return {
                clientId: JSON.parse(localStorage.getItem('user')),
                date: '',
                subtotal: 0,
                movieList: [],
                status: ['PENDING'],
            };
        },
        computed: {
            subtotalGeneral: function() {
                let total = 0;
                for (const movie of this.movieList) {
                    total = (movie.quantity * movie.price) + total;
                }
                return total;
            }
        },

        beforeMount() {
            const data = localStorage.getItem('movieList');
            if (data)
                this.movieList = JSON.parse(data);
            else
                this.movieList = [];
        },
        methods: {
            getSubtotal: function() {
                let total = 0;
                for (const movie of this.movieList) {
                    total = (movie.quantity * movie.price) + total;
                }
                return total;
            },
            saveReservation: async function (status) {

                const self = this;
                const to_save = {
                    clientId: this.clientId,
                    movies: this.movieList,
                    subtotal: this.getSubtotal(),
                    status: status
                };
                await Axios.methods.POST('/reservation/save', to_save)
                    .then(async (response) => {
                        Alert.methods.showAlert('success', 'Reserva creada satisfactoriamente.', self);
                        console.log(response);
                        localStorage.setItem('movieList', JSON.stringify([]));
                        self.movieList = [];
                        await self.updateStockMovie(to_save.movies);
                        self.$router.push('/home');
                    })
                    .catch(function (error) {
                        Alert.methods.showAlert('warning', 'Error creando Reserva, intente de nuevo.', self);
                        console.log(error);
                        throw new Error(error);
                    });
            },

            updateStockMovie: async function(movies) {
                for (const movie of movies) {
                    movie.quantity = movie.stock;
                    await Axios.methods.PUT('/movie/update', movie)
                        .then(async (response) => {
                            console.log(response);
                        })
                        .catch(function (error) {
                            Alert.methods.showAlert('warning', 'Error actualizando stock de peliculas, intente de nuevo.', self);
                            console.log(error);
                            throw new Error(error);
                        });
                }
            }
        },
        filters: {
            currency: function (value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>

<style scoped>

</style>