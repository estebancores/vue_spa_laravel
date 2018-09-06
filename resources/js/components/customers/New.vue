<template>
    <div class="col-lg-5 offset-4">
        <form @submit.prevent="create()">
            <div class="form-group row">
                <label for="email">Name:</label>
                <input type="text" v-model="customer.name" class="form-control">
            </div>
            <div class="form-group row">
                <label for="email">Phone:</label>
                <input type="text" v-model="customer.phone" class="form-control">
            </div>
            <div class="form-group row">
                <label for="email">Email:</label>
                <input type="email" v-model="customer.email" class="form-control">
            </div>
            <div class="form-group row">
                <label for="password">Website:</label>
                <input type="text" v-model="customer.website" class="form-control">
            </div>
            <div class="form-group row">
                <div class="col-lg-10">
                    <input type="submit" value="Create" class="btn btn-outline-info">
                </div>
                <div class="col-lg-2">
                    <router-link to="/">Cancel</router-link>
                </div>

            </div>
            <div class="form-group row" v-if="errors">
                <div class="alert alert-danger" role="alert">
                    <ul>
                        <li v-for="(fieldsErrors, fieldName) in errors" :key="fieldName">
                            <strong> {{fieldName}} :</strong> {{fieldsErrors.join('\n')}}
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import validate from 'validate.js';

    export default {
        name: "new-customer",
        data() {
            return {
                customer: {
                    name: '',
                    phone: '',
                    email: '',
                    website: '',
                },
                errors: null,
            }
        },
        computed:{
            currentUser(){
                return this.$store.getters.currentUser;
            }
        },
        methods: {
            create() {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.customer, constraints);
                if (errors) {
                    this.errors = errors;
                    return;
                }
                axios.post('api/customers/new', this.$data.customer, {
                    headers: {
                        'Authorization': `Bearer ${this.currentUser.token}`,
                    }
                }).then((response) => {
                    this.$router.push('/customers');
                }).catch((error)=>{
                   alert('error');
                });

            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: "Must be at least 3 characters"
                        }
                    },
                    phone: {
                        presence: true,
                        numericality: true,
                        length: {
                            minimum: 7,
                            message: "Must be at least 7 characters"
                        }
                    },
                    email: {
                        presence: true,
                        email: true,
                    },
                    website: {
                        presence: true,
                        url: true,
                    },
                }
            }
        }
    }
</script>

<style scoped>

</style>