<template>
  <div class="gutter-example" v-if="show">
    <NavigationBar :current="currentTab"/> 
    <a-row type="flex" justify="center">
      <a-col :span="13">
        <div style="margin-top: 100px">
          <Article style="display: flex; justify-content: center" :loading="loading" :reverse="reverseFather" :articles="articles"/>
        </div>
      </a-col>
      <a-col :span="6">
        <a-affix :offset-top="100">
          <div style="width: 110%">
            <SideBar style="justify-content: center"/>
          </div>
        </a-affix>
      </a-col>
    </a-row>
    <a-back-top class="toTopBtn">
      <a-button shape="circle" icon="vertical-align-top" size="large"/>
    </a-back-top>
    <a-button v-if="addBtnShow" shape="circle" icon="sync" size="large" class="reverseBtn" @click="reverseTime"/>
    <a-button v-if="addBtnShow" shape="circle" icon="plus" size="large" class="addArticleBtn" @click="addArticle"/>
  </div>
</template>

<script>
import { getAllArticle } from "@/apis";
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import Article from '@/components/Article/Article.vue';
import SideBar from '@/components/SideBar/SideBar.vue';
export default {
  name: 'Index',
  components: { NavigationBar, Article, SideBar },
  data() {
    return {
      show: false,
      addBtnShow: false,
      reverseFather: false,
      currentTab: ['1'],
      articles: [],
      loading: true,
    }
  },
  async mounted() {
    setTimeout(() => {
      this.show = true;
		}, 1000)
    setTimeout(() => {
      this.addBtnShow = true;
		}, 2000)
    try {
      this.articles = (await getAllArticle()).data.data;
      this.articles.forEach(function (item) {
        if(item.tags) {
            item.tagsForShow = item.tags.split('-');
        }
      })
      this.loading = false;
    } catch(err) {
      console.log(err);
    }
  },
  methods: {
    addArticle () {
      this.$router.push("/addArticle");
    },
    reverseTime() {
      this.reverseFather = !this.reverseFather;
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
  z-index: 1000;
  right: 40px;
  bottom: 40px;
}
.reverseBtn {
  position: fixed;
  right: 40px;
  z-index: 1000;
  bottom: 100px;
}
.toTopBtn {
  position: fixed;
  right: 40px;
  bottom: 160px;
  z-index: 1000;
}
</style>