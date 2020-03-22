<template>
    <div class="container">
        <div class="form-row">
            <div class="col">
                <h4>Total DELIVERED:</h4>
            </div>
            <div class="col">
                {{stats.totalDelivered}}
            </div>
        </div>
        <div class="form-row">
            <div class="col">
                <h4>Total DECLINED:</h4>
            </div>
            <div class="col">
                {{stats.totalDeclined}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                stats: {}
            }
        },
        mounted() {
            console.log(this.$store);
            this.$http.get(this.$store.state.apiConstants.home)
                .then(response => this.stats = response.data);
        }
    }
</script>

<style>

</style>