<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/customers/new" class="btn btn-outline-primary">
                New
            </router-link>
        </div>
        <table class="table table-bordered">
            <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
            </thead>
            <tbody>
            <template v-if="!customers.length">
                <tr>
                    <td colspan="4" class="text-center">No Customers Available</td>
                </tr>
            </template>
            <template v-else>
                <tr v-for="customer in customers" :key="customer.id">
                    <td>{{customer.name}}</td>
                    <td>{{customer.email}}</td>
                    <td>{{customer.phone}}</td>
                    <td>
                        <router-link :to="`/customers/${customer.id}`">Detail</router-link>
                    </td>
                </tr>
            </template>

            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "list",
        mounted() {
            this.$store.dispatch('getCustomers');
        },
        computed: {
            customers() {
                return this.$store.getters.customers;
            }
        }

    }
</script>

<style scoped>
    .btn-wrapper {
        text-align: right;
        margin:10px 0;
    }
</style>