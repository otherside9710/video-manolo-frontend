<template>
    <div>
        <Navbar></Navbar>
        <MovieUser></MovieUser>
    </div>
</template>

<script>
    import Navbar from "../../../admin/shared/components/navbar/ui/Navbar";
    import MovieUser from "../../movie/ui/MovieUser";
    export default {
        name: "Home",
        components: {MovieUser, Navbar}
    }
</script>

<style scoped>

</style>