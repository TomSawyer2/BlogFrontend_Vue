<template>
    <div v-if="show">
        <div v-if="haveTag">
            <NavigationBar :current="currentTab" />
            <a-row type="flex" justify="center" class="PCArticle">
                <a-col :span="18">
                    <div style="margin-top: 100px; margin-left: 100px; margin-bottom: 50px; display: flex">
                        <div class="circle" :style="{ backgroundColor: tag.color }" />
                        <div class="tagInformation" style="display: flex; align-items: center; justify-items: center">
                            <p class="tagName">{{ tag.name }}</p>
                        </div>
                    </div>
                    <div>
                        <Article
                            style="display: flex; justify-content: center"
                            :articles="articles"
                            :loading="loading"
                            :reverse="reverseFather" />
                    </div>
                </a-col>
            </a-row>
            <a-row type="flex" justify="center" class="MobileArticle">
                <a-col :span="24">
                    <div style="margin-top: 100px; margin-left: 50px; display: flex">
                        <div class="circle" :style="{ backgroundColor: tag.color }" />
                        <div class="tagInformation" style="display: flex; align-items: center; justify-items: center">
                            <p class="tagName">{{ tag.name }}</p>
                        </div>
                    </div>
                    <MobileArticle
                        style="display: flex; justify-content: center; margin-top: 30px"
                        :loading="loading"
                        :articles="articles" />
                </a-col>
            </a-row>
            <a-back-top class="toTopBtn">
                <a-button shape="circle" icon="vertical-align-top" size="large" />
            </a-back-top>
            <a-button
                v-if="addBtnShow"
                shape="circle"
                icon="sync"
                size="large"
                class="reverseBtn"
                @click="reverseTime" />
            <a-button v-if="addBtnShow" shape="circle" icon="appstore" size="large" class="toAllBtn" @click="toAll" />
        </div>
        <div v-else>
            <NavigationBar :current="currentTab" />
            <WordCloudChart @tagData="tagFromChild" />
        </div>
        <BottomBar :current="currentTab" class="bottomBar" />
    </div>
</template>

<script>
import { getArticleByTag } from '@/apis';
import WordCloudChart from '@/components/WordCloudChart/WordCloudChart.vue';
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import BottomBar from '@/components/NavigationBar/BottomBar.vue';
import Article from '@/components/Article/Article.vue';
import MobileArticle from '@/components/Article/MobileArticle.vue';
export default {
    name: 'Index',
    components: { NavigationBar, Article, WordCloudChart, BottomBar, MobileArticle },
    data() {
        return {
            articles: [],
            show: false,
            addBtnShow: false,
            reverseFather: false,
            currentTab: ['2'],
            tag: this.$route.params.tag,
            haveTag: this.$route.params.tag ? true : false,
            loading: true
        };
    },
    async mounted() {
        setTimeout(() => {
            this.show = true;
        }, 1000);
        setTimeout(() => {
            this.addBtnShow = true;
        }, 2000);
        if (this.haveTag == true) {
            try {
                this.articles = (await getArticleByTag({ tag: this.tag.name })).data.data;
                this.articles.forEach(function(item) {
                    if (item.tags) {
                        item.tagsForShow = item.tags.split('-');
                    }
                });
                this.loading = false;
            } catch (err) {
                console.log(err);
            }
        }
    },
    methods: {
        addArticle() {
            this.$router.push('/addArticle');
        },
        reverseTime() {
            this.reverseFather = !this.reverseFather;
        },
        tagFromChild(data) {
            this.tag = data;
            this.haveTag = true;
        },
        toAll() {
            this.tag = {};
            this.haveTag = false;
        }
    },
    watch: {
        async haveTag(newV) {
            if (newV == true) {
                if (this.haveTag) {
                    try {
                        this.articles = (await getArticleByTag({ tag: this.tag.name })).data.data;
                        this.articles.forEach(function(item) {
                            if (item.tags) {
                                item.tagsForShow = item.tags.split('-');
                            }
                        });
                        this.loading = false;
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.8s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
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
.circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    /* 宽度和高度需要相等 */
}
.tagInformation {
    margin-left: 50px;
}
.tagName {
    font-size: 30px;
    margin-bottom: 0px;
}
.bottomBar {
    position: fixed;
    bottom: 0px;
    display: none;
}
.toAllBtn {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1000;
}
@media screen and (max-width: 800px) {
    .bottomBar {
        display: block;
    }
    .PCArticle {
        display: none;
    }
    .MobileArticle {
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
    .toAllBtn {
        bottom: 80px;
        right: 20px;
    }
}
</style>
