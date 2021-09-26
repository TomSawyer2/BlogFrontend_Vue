<template>
  <div class="home">
    <img class="web_bg" src="https://youimg1.c-ctrip.com/target/1A091a00000196zd74F49.jpg">
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
		}, 1000)
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
</style>