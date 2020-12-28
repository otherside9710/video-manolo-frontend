<template>
    <div>
        <Navbar></Navbar>
        <div class="container mt-3 mb-5">
        <form v-on:submit="submit">
            <div class="form-group">
                <label for="title">Titulo</label>
                <input type="text" class="form-control" id="title" v-model="title"
                       placeholder="Ingrese un titulo" required>
            </div>
            <div class="form-group">
                <label for="generalDescription">Descripción General</label>
                <input type="text" class="form-control" id="generalDescription" v-model="generalDescription"
                       placeholder="Ingrese alguna descripcion general" required>
            </div>
            <div class="form-group">
                <label for="directors">Lista de directores</label>
                <input type="text" class="form-control" id="directors" v-model="director"
                       placeholder="Ingrese dato separado por ';'" required>
            </div>
            <div class="form-group">
                <label for="actorList">Lista de actores</label>
                <input type="text" class="form-control" id="actorList" v-model="actors"
                       placeholder="Ingrese dato separado por ';'" required>
            </div>
            <div class="form-group">
                <label for="price">Precio</label>
                <input type="text" class="form-control" id="price" v-model="price" required
                       placeholder="Enter any Title">
            </div>
            <div class="form-group">
                <label for="quantity">Cantidad</label>
                <input type="text" class="form-control" id="quantity" required v-model="quantity"
                       placeholder="Enter any Quantity">
            </div>
            <button type="submit" class="btn btn-success btn-lg btn-block">Submit</button>
        </form>
        <br><br>
    </div>
    </div>
</template>

<script>
    import Axios from "../../../app/services/axios/Axios";
    import Alert from "../../../app/ui/components/Alert/Alert";
    import Navbar from "../../shared/components/navbar/ui/Navbar";

    export default {
        name: "MovieAdmin",
        components: {Navbar},
        data: function () {
            return {
                title : '',
                generalDescription : '',
                actors : '',
                actorList : [],
                director : '',
                directors : [],
                quantity : '',
                price : '',
            };
        },
        methods: {
            submit: async function (e) {
                e.preventDefault();
                const self = this;
                const to_save = {
                    title: this.title,
                    generalDescription: this.generalDescription,
                    actorList: this.actors.split(";"),
                    directors: this.director.split(";"),
                    quantity: this.quantity,
                    price: this.price
                };

                await Axios.methods.POST('/movie/save', to_save)
                    .then(async (response) => {
                        Alert.methods.showAlert('success', 'Su Pelicula se ha creado correctamente!', self);
                        self.cleanForm();
                        console.log(response);
                    })
                    .catch(function (error) {
                        Alert.methods.showAlert('error', 'Ocurrio un error al crear la pelicula, por favor intente de nuevo.', self);
                        console.log(error);
                        throw new Error(error);
                    });
            },
            cleanForm: function () {
                this.title='';
                this.generalDescription='';
                this.actors='';
                this.actorList=[];
                this.director='';
                this.directors=[];
                this.quantity='';
                this.price='';
            },
        }
    }
</script>

<style scoped>

</style>