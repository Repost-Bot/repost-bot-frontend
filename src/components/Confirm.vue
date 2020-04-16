<template>
    <div class="container">
        <b-form v-if="isValid">
            <b-form-group
                    id="input-group-1"
                    label="Password:"
                    label-for="password"
            >
                <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                        placeholder="Password"
                ></b-form-input>
            </b-form-group>
            <b-button variant="primary" @click="setPassword">Submit</b-button>
        </b-form>
        <div v-else>Invalid token</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isValid: false,
                password: ''
            }
        },
        methods: {
            setPassword() {
                this.$http.post(
                    this.$constants.confirmUser,
                    {
                        token: this.$route.params.token,
                        password: this.password
                    }
                )
                    .then(() => this.$router.push('/'))
            }
        },
        mounted() {
            this.$http.get(this.$constants.confirmUser, {params: {token: this.$route.params.token}})
                .then(() => this.isValid = true, () => this.isValid = false)
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>