<template>
    <div id="app">
        <transition name="slide-fade">
            <router-view />
        </transition>
    </div>
</template>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.slide-fade-enter-active {
    transition: all 1s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
}
</style>

<style>
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: hsla(220, 4%, 58%, 0.5);
    transition: background-color 0.3s;
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(107, 105, 105);
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
