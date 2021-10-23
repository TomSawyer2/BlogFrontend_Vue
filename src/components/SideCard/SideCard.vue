<template>
    <div class="trans">
        <transition-group name="slide-fade">
            <p class="title" :key="6001">{{ articleDetail.title }}</p>
            <div class="tags" :key="6002">
                <span v-for="(tag, index) in articleDetail.tagsForShow" :key="index">
                    <a-tag color="blue" class="tags">
                        {{ tag ? tag : '暂无' }}
                    </a-tag>
                </span>
            </div>
            <span class="brief" :key="6003">{{ articleDetail.brief ? articleDetail.brief : '暂无简介~' }}</span>
            <a-divider class="divider" :key="6004"/>
            <div class="personalInformation" :key="6005">
                <p class="titleMobile">{{ title }}</p>
                <a-avatar slot="avatar" :size="40" src="https://tomsawyer2.xyz/pics/venti.jpg" />
                <span class="username">TomSawyer2</span>
            </div>
            <a-divider class="divider" :key="6006"/>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'SideCard',
    props: ['articleDetail'],
    data() {
        return {
            height: 100,
            detail: {}
        };
    },
    methods: {},
    mounted() {
        this.height = document.body.clientHeight;
    },
    computed: {
        title: function() {
            if(this.articleDetail.title.length > 6) {
                return this.articleDetail.title.substr(0, 5) + '...';
            } else {
                return this.articleDetail.title;
            }
        }
    }
};
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
    font-size: 30px;
}
.titleMobile {
    position: fixed;
    left: 40px;
    font-size: 30px;
    margin: 0px 0px;
    display: none;
}
.tags {
    margin-bottom: 15px;
    font-size: 15px;
}
.brief {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.personalInformation {
    display: flex;
    justify-content: flex-start;
}
.username {
    display: flex;
    font-size: 20px;
    margin-left: 20px;
    align-content: center;
}
.tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
@media screen and (max-width: 1050px) {
    .tags {
        display: none;
    }
    .brief {
        display: none;
    }
    .personalInformation {
        justify-content: flex-end;
    }
    .title {
        display: none;
    }
    .titleMobile {
        display: block;
    }
    .divider {
        display: none;
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
</style>
