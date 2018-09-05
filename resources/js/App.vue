<template>
    <div id="main">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/navigation/Header';

    export default {
        components: {Header},
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
