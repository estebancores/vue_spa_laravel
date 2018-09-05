<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Vue app</div>
                    <div class="card-body">
                        This is main
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {
        },
        data() {
            return {
                menu: 'hola',
            }
        },
        methods: {
            access() {
                console.log('componente main');
            }
        }
    }
</script>

<style scoped>

</style>