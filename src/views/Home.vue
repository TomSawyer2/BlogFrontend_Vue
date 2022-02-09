<template>
    <div class="home">
        <transition name="slide-fade-main">
            <div class="background">
                <div class="frosted-glass"></div>
            </div>
        </transition>
        <div>
            <a-spin style="margin-top: 380px">
                <a-icon slot="indicator" type="loading" style="font-size: 150px" spin />
            </a-spin>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {};
    },
    mounted() {
        setTimeout(() => {
            this.$router.push('/index');
        }, 1000);
    }
};
</script>

<style scoped>
.web_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    background-image: url(https://upload-bbs.mihoyo.com/upload/2021/10/05/76237708/3727c82a746aad16a14ef6f2f91a36e7_4185820189046643363.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
}
.slide-fade-main-enter-active {
    transition: all 0.8s ease;
}
.slide-fade-main-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-main-enter, .slide-fade-main-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(0px);
}
.frosted-glass {
    width: 100%;
    height: 100%;
    background: inherit;
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -ms-filter: blur(3px);
    -o-filter: blur(3px);
    filter: blur(3px);
}
</style>
