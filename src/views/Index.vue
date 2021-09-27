<template>
  <div class="gutter-example" v-if="show">
    <NavigationBar /> 
    <a-row type="flex" justify="center">
      <a-col :span="16">
        <div style="margin-top: 100px">
          <Article style="display: flex; justify-content: center"/>
        </div>
      </a-col>
      <a-col :span="4">
        <div style="margin-top: 100px">
          col-4
        </div>
      </a-col>
    </a-row>
    <a-button shape="circle" icon="plus" size="large" class="addArticleBtn" @click="addArticle"/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import Article from '@/components/Article/Article.vue';
export default {
  name: 'Index',
  components: { NavigationBar, Article },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
		}, 1000)
  },
  methods: {
    addArticle () {
      this.$router.push("/addArticle");
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-17px);
  opacity: 0;
}
.addArticleBtn {
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>