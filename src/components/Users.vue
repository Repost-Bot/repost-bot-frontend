<template>
    <div class="container">
        <b-table striped hover :items="users" :fields="tableFields"></b-table>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                tableFields: [
                    {key: "id"},
                    {key: "username"},
                    {key: "fullName"},
                    {key: "registeredAt"},
                    {key: "confirmedAt"},
                    {key: "deletedAt"}
                ],
                users: []
            }
        },
        mounted() {
            this.$http.get(this.$constants.users)
                .then(response => {
                    this.users = response.data
                    this.users.forEach(item => item.registeredAt = moment(String(item.registeredAt)).format('MMMM Do YYYY, HH:mm'))
                    this.users.filter(item => item.confirmedAt).forEach(item => item.confirmedAt = moment(String(item.confirmedAt)).format('MMMM Do YYYY, HH:mm'))
                    this.users.filter(item => item.deletedAt).forEach(item => item.deletedAt = moment(String(item.deletedAt)).format('MMMM Do YYYY, HH:mm'))
                    this.users.filter(item => item.deleted).forEach(item => item._rowVariant = "danger")
                })

        }
    }
</script>

<style>

</style>