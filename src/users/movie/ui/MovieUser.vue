<template>
    <div class="container-fluid">
        <div class="row mt-5 mb-5">
            <div class="col-md-3" v-for="(movie, index) of movies" :key="index">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="https://images.all-free-download.com/images/graphicthumb/movie_time_design_elements_vector_backgrounds_547329.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.title }}</h5>
                        <p class="card-text">{{ movie.generalDescription }}</p>
                        <p class="card-text"><span>Stock: {{ movie.quantity }}</span></p>
                        <p class="card-text"><span>Precio: {{ movie.price | currency }}</span></p>
                        <button type="button" :class="['btn btn-primary btn-block']"
                                @click="saveMovieTemporally(movie)"
                                :disabled="movie.quantity === 0" >Reservation</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";

    export default {
        name: "MovieUser",
        data: function () {
            return {
                movies: []
            }
        },
        methods: {
            saveMovieTemporally: function (movie) {
                let mov = localStorage.getItem('movieList');
                let movies = [];
                movie.quantity--;
                if (mov && mov !== '[]') {
                    movies = JSON.parse(mov);
                    if (!this.existMovie(movie.id, movies)) {
                        const {id, title, generalDescription, price, actorList, directors} = movie;
                        movies.push({
                            id: id,
                            title: title,
                            quantity: 1,
                            price: price,
                            generalDescription: generalDescription,
                            directors: directors,
                            actorList: actorList,
                            stock: movie.quantity
                        });
                    } else {
                        const index = this.getIndex(movie.id, 'id', movies);
                        movies[index]['quantity']++;
                        movies[index]['stock'] = movie.quantity;
                    }
                } else {
                    const {id, title, generalDescription, price, actorList, directors} = movie;
                    movies = [
                        {
                            id: id,
                            title: title,
                            generalDescription: generalDescription,
                            quantity: 1,
                            price: price,
                            directors: directors,
                            actorList: actorList,
                            stock: movie.quantity
                        }
                    ];
                }
                localStorage.setItem('movieList', JSON.stringify(movies));
                Alert.methods.showAlert('success', 'Pelicula ' + movie.title + ' Añadida para reserva', this);
            },
            getIndex: function(query, key, array){
                let i=0;
                for (const data of array) {
                    if (query === data[key]) {
                        return i;
                    }
                    i++;
                }
                return -1;
            },
            existMovie: function (movieId, movies) {
                for (const movie of movies) {
                    if (movieId === movie.id){
                        return true;
                    }
                }
                return false;
            }
        },
        async beforeMount () {
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