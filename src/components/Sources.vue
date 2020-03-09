<template>
    <div class="container">
        <b-button v-b-modal.create-source block variant="primary">Create source</b-button>

        <b-card-group deck class="k-sources">
            <k-source v-bind:key="idx" v-for="(source, idx) in sources" :image="source.imageUrl" :name="source.name"></k-source>
        </b-card-group>

        <!-- The modal -->
        <b-modal id="create-source">
            <b-form>
                <b-form-group
                        id="input-group-1"
                        label="Domain Type:"
                        label-for="domainType"
                >
                    <b-form-select id="domainType" v-model="domainType" :options="domainTypes"></b-form-select>
                </b-form-group>
                <b-form-group
                        id="input-group-2"
                        label="Domain Id:"
                        label-for="domainId"
                >
                    <b-form-input
                            id="domainId"
                            v-model="domainId"
                            type="text"
                            required
                            placeholder="Domain Id"
                    ></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="createSource">Submit</b-button>
                <b-button type="reset" variant="danger" @click="closeModal">Close</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import kSource from './Source.vue'

    export default {
        components: {kSource},
        data: function () {
            return {
                domainType: '',
                domainId: '',
                domainTypes: ['VK'],
                sources: []
            }
        },
        methods: {
            createSource: function () {
                this.$http.post(
                    this.$constants.createSource,
                    {
                        domainType: this.domainType,
                        domainId: this.domainId
                    }
                );
                this.closeModal();
                this.$toast.open({
                   type: 'success',
                   message: 'Source saved'
                });
            },
            closeModal: function () {
                this.$bvModal.hide('create-source');
                this.getSources();
            },
            getSources: function () {
                this.$http.get(
                    this.$constants.getSources,
                )
                .then(response => {
                    this.sources = response.data
                });
            }
        },
        mounted() {
            this.getSources();
        }
    }
</script>

<style>
    .k-sources {
        margin-top: 60px;
    }
</style>