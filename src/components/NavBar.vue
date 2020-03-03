<template>
    <div class="nav-bar">
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand>KitchenFit Bot</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/posts">Posts</b-nav-item>
                    <b-nav-item to="/queue">Queue</b-nav-item>
                    <b-nav-item to="/input-sources">Sources</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style>
    .nav-bar {
        margin-bottom: 60px;
    }
</style>