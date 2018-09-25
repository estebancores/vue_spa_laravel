<template>
    <div class="customer-detail" v-if="customer">
        <div class="customer-image">
            <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png" alt="">
        </div>
        <div class="cusomer-info">
            <table class="table">
                <tr>
                    <td>ID</td>
                    <td>{{customer.id}}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{customer.email}}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{{customer.phone}}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>{{customer.website}}</td>
                </tr>
            </table>
            <router-link to="/customers"> Back</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
            return {
                customer: null,
            }
        },
        created() {

            if (this.customers.length) {
                this.customers.find((customer) => customer.id == this.$route.params.id);
            } else {

                axios.get(`api/customers/${this.$route.params.id}`).then((response) => {
                    this.customer = response.data.customer;
                });
            }
        },
        methods: {},
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            customers() {
                return this.$store.getters.customers;
            }
        }

    }
</script>

<style scoped>
    .customer-detail {
        display: flex;
        align-items: center;
    }

    .customer-image {
        flex: 1;
    }

    .customer-image img {
        max-width: 200px;
    }

    .cusomer-info {
        flex: 2;
    }
</style>