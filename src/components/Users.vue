<template>
    <div class="container">
        <b-table striped hover :items="users"></b-table>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                users: []
            }
        },
        mounted() {
            this.$http.get(this.$constants.users)
                .then(response => {
                    this.users = response.data
                    this.users.forEach(item => item.registeredAt = moment(String(item.registeredAt)).format('MMMM Do YYYY, HH:mm'))
                    this.users.forEach(item => item.confirmedAt = moment(String(item.confirmedAt)).format('MMMM Do YYYY, HH:mm'))
                })

        }
    }
</script>

<style>

</style>