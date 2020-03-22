<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <b-form @submit="login" :class="{'loading': isLoading}">
            <b-form-group
                    label="Username"
                    label-for="username"
            >
                <b-form-input
                        id="username"
                        v-model="username"
                        type="email"
                        required
                        placeholder="Enter username">
                </b-form-input>
            </b-form-group>
            <b-form-group
                    label="Password"
                    label-for="password"
            >
                <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                        placeholder="Enter password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import Spinner from "./Spinner";

    export default {
        components: {Spinner},
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            login: function () {

            }
        }
    }
</script>

<style>

</style>