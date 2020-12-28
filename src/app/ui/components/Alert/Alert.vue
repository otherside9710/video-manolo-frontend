<script>
    export default {
        name: "Alert",
        methods: {
            showAlert: function (type, message, $this) {
                const Toast = $this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', $this.$swal.stopTimer);
                        toast.addEventListener('mouseleave', $this.$swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: type,
                    title: message
                })
            }
        }
    }
</script>