<script>
    import axios from '../../config/axios/axiosInstance';

    export default {
        name: "Axios",
        methods: {
            GET: async (url, params) => {
                return axios.get(url, {params});
            },
            POST: async function (url, data) {
                return axios.post(url, data);
            },
            PUT: async (url, data) => {
                return axios.put(url, data);
            }
        }
    }
</script>