<template>
  <div class="home">
    <transition name="slide-fade-main">
      <img class="web_bg" src="https://youimg1.c-ctrip.com/target/1A091a00000196zd74F49.jpg">
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
    return {
    }
  },
  mounted() {
    setTimeout(() => {
      this.$router.push('/index')
		}, 2000)
  }
}
</script>

<style scoped>
.web_bg{
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  min-width: 1000px;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.slide-fade-main-enter-active {
  transition: all .8s ease;
}
.slide-fade-main-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-main-enter, .slide-fade-main-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(0px);
}
</style>