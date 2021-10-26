<template>
    <div v-if="show">
        <NavigationBar :current="currentTab" />
        <a-row type="flex" justify="center" class="article__wrapper--PC">
            <a-col :span="13">
                <div style="margin-top: 100px">
                    <Article
                        class="article__box--PC"
                        :loading="loading"
                        :reverse="reverseFather"
                        :articles="articles" />
                </div>
            </a-col>
            <a-col :span="6" class="sideBar">
                <a-affix :offset-top="100">
                    <div style="width: 110%">
                        <SideBar style="justify-content: center" />
                    </div>
                </a-affix>
            </a-col>
        </a-row>
        <a-row type="flex" justify="center" class="article__wrapper--Mobile">
            <a-col :span="24">
                <MobileArticle
                    class="article__box--Mobile"
                    :loading="loading"
                    :articles="articles" />
            </a-col>
        </a-row>
        <Footer />
        <a-back-top class="toTopBtn">
            <a-button shape="circle" icon="vertical-align-top" size="large" />
        </a-back-top>
        <div class="trans">
            <transition-group name="slide-fade">
                <a-button :key="1111" shape="circle" icon="sync" size="large" class="reverseBtn" @click="reverseTime" />
                <a-button
                    :key="1112"
                    shape="circle"
                    icon="plus"
                    size="large"
                    class="addArticleBtn"
                    v-if="isLogin"
                    @click="addArticle" />
                <a-button :key="1113" shape="circle" icon="sync" size="large" class="reverseMobileBtn" @click="reverseMobileTime" />
            </transition-group>
        </div>
        <BottomBar :current="currentTab" class="bottomBar" />
    </div>
</template>

<script>
import { getAllArticle } from '@/apis'
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
import Article from '@/components/Article/Article.vue'
import MobileArticle from '@/components/Article/MobileArticle.vue'
import SideBar from '@/components/SideBar/SideBar.vue'
import Footer from '@/components/Footer/Footer.vue'
import { getToken } from '@/utils/storage.js'
export default {
    name: 'Index',
    components: { NavigationBar, Article, SideBar, MobileArticle, BottomBar, Footer },
    data() {
        return {
            show: false,
            reverseFather: false,
            currentTab: ['1'],
            articles: [],
            loading: true,
            isLogin: getToken() ? true : false
        };
    },
    async mounted() {
        setTimeout(() => {
            this.show = true;
        }, 1000);
        try {
            this.articles = (await getAllArticle()).data.data;
            this.articles.forEach(function(item) {
                if (item.tags) {
                    item.tagsForShow = item.tags.split('-');
                }
            });
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        addArticle() {
            this.$router.push('/addArticle');
        },
        reverseTime() {
            this.reverseFather = !this.reverseFather;
        },
        reverseMobileTime() {
            this.articles.reverse();
        }
    }
};
</script>

<style scoped>
.addArticleBtn {
    position: fixed;
    z-index: 1000;
    right: 40px;
    bottom: 160px;
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
    bottom: 40px;
    z-index: 1000;
}
.reverseMobileBtn {
    display: none;
    position: fixed;
    right: 20px;
    bottom: 80px;
    z-index: 1000;
}
@media screen and (max-width: 1000px) {
    .sideBar {
        display: none;
    }
    .article__wrapper--PC {
        width: 100%;
    }
}
.article__wrapper--Mobile {
    display: none;
}
.bottomBar {
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: none;
}
@media screen and (max-width: 800px) {
    .article__wrapper--PC {
        display: none;
    }
    .article__wrapper--Mobile {
        display: block;
    }
    .reverseMobileBtn {
        display: block;
    }
    .reverseBtn {
        display: none;
    }
    .toTopBtn {
        bottom: 140px;
        right: 20px;
    }
    .addArticleBtn {
        display: none;
    }
    .bottomBar {
        display: block;
    }
}
.trans {
    position: relative;
    overflow: hidden;
}
.slide-fade-leave-to {
    opacity: 0;
}
.slide-fade-enter-from {
    opacity: 0;
}
.article__box--PC {
    display: flex; 
    justify-content: center;
}
.article__box--Mobile {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>
