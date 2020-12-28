<template >
    <div>
        <br>
        <strong><h3>Customer</h3></strong>
        <table class="table ">
            <thead class="thead-dark">
            <tr>
                <th scope="col" v-for="(name, index) of header" :key="index">
                    {{ name }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Table",
        data: function () {
            return {
                header: ['FirstName', 'LastName', 'Phone', 'Email'],
                date: []

            }
        }
    }
</script>

<style scoped>

</style>