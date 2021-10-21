<template>
    <div v-if="show">
        <div v-if="haveTag">
            <NavigationBar :current="currentTab" />
            <div class="trans">
                <transition-group name="slide-fade">
                    <a-row type="flex" justify="center" class="article__PC" :key="2001">
                        <a-col :span="18">
                            <div class="article__PC--header">
                                <div class="circle" :style="{ backgroundColor: tag.color }" />
                                <div class="article__PC--tag">
                                    <p class="article__PC--tag__name">{{ tag.name }}</p>
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
                </transition-group>
                <a-row type="flex" justify="center" class="article__Mobile">
                    <a-col :span="24">
                        <div class="article__Mobile--header">
                            <div class="circle" :style="{ backgroundColor: tag.color }" />
                            <div class="article__Mobile--tag">
                                <p class="article__Mobile--tag__name">{{ tag.name }}</p>
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
                <a-button
                    v-if="addBtnShow"
                    shape="circle"
                    icon="appstore"
                    size="large"
                    class="toAllBtn"
                    @click="toAll"
                    :key="2005" />
            </div>
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

.article__Mobile {
    display: none;
}

.article__Mobile--header {
    margin-top: 100px; 
    margin-left: 50px; 
    display: flex;
}

.article__Mobile--tag {
    display: flex; 
    align-items: center; 
    justify-items: center;
}

.article__Mobile--tag__name {
    font-size: 30px;
    margin-bottom: 0px;
}

.article__PC--header {
    margin-top: 100px; 
    margin-left: 100px; 
    margin-bottom: 50px; 
    display: flex;
}

.article__PC--tag {
    margin-left: 50px;
    display: flex; 
    align-items: center; 
    justify-items: center;
}

.article__PC--tag__name {
    font-size: 30px;
    margin-bottom: 0px;
}

@media screen and (max-width: 800px) {
    .bottomBar {
        display: block;
    }
    .article__PC {
        display: none;
    }
    .article__Mobile {
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
.trans {
    position: relative;
    overflow: hidden;
    min-height: 200px;
}
.slide-fade-leave-to {
    opacity: 0;
}
.slide-fade-enter-from {
    opacity: 0;
}
</style>
