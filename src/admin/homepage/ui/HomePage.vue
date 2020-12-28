<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <br>
            <TableMovie></TableMovie>
            <TableUser></TableUser>
            <Reservation></Reservation>
        </div>
    </div>
</template>

<script>
    import Navbar from "../../shared/components/navbar/ui/Navbar";
    import TableMovie from "../../movie/ui/TableMovie";
    import TableUser from "../../user/ui/TableUser";
    import Reservation from "../../reservation/ui/Reservation";
    export default {
        name: "HomePage",
        components: {
            Reservation,
            TableUser,
            TableMovie,
            Navbar
        },

    }
</script>

<style scoped>

</style>