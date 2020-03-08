<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <div class="form-row controls" :class="{'loading': isLoading}">
            <div class="col">
                <button type="submit" style="width: 100%" class="btn btn-primary controls"
                        @click="settings.push({key: '', value: ''})">Add more
                </button>
            </div>
            <div class="col">
                <button type="submit" style="width: 100%" class="btn btn-primary controls" @click="saveSettings">Save
                </button>
            </div>
        </div>

        <div class="form-row row" v-bind:key="idx" v-for="(elem, idx) in settings">
            <div class="col">
                <input type="text" class="form-control" placeholder="Key" v-model="elem.key">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Value" v-model="elem.value">
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "./Spinner";

    export default {
        components: {Spinner},
        data: function () {
            return {
                settings: [],
                isLoading: false
            }
        },
        methods: {
            saveSettings: function () {
                this.isLoading = true;
                const result = this.settings
                    .filter(elem => elem.key !== '');

                if (result.length != 0) {
                    this.$http.post(
                        this.$constants.settings,
                        result
                    )
                        .then(() => this.isLoading = false);
                }
            }
        },
        mounted() {
            this.isLoading = true;
            this.$http.get(this.$constants.settings)
                .then(response => this.settings = response.data)
                .then(() => this.isLoading = false);
        }
    }
</script>

<style>
    .row {
        margin-bottom: 30px;
    }

    .controls {
        margin-bottom: 60px;
    }

    .loading {
        opacity: 0.5;
    }
</style>