<template>
    <div>
        <p class="title">{{ articleDetail.title }}</p>
        <div class="tags">
            <span v-for="(tag, index) in articleDetail.tagsForShow" :key="index">
                <a-tag color="blue" class="tags">
                    {{ tag ? tag : "暂无" }}
                </a-tag>
            </span>
        </div>
        <span class="brief">{{ articleDetail.brief ? articleDetail.brief : "暂无简介~" }}</span>
        <a-divider class="divider"/>
        <div class="personalInformation">
            <p class="titleMobile">{{ articleDetail.title }}</p>
            <a-avatar
                slot="avatar"
                :size="40"
                src="https://tomsawyer2.xyz/pics/venti.jpg"
            />
            <span class="username">hanserena</span>
        </div>
        <a-divider class="divider"/>
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
        }
    },
    methods: {
        
    },
    mounted() {
        this.height = document.body.clientHeight;
    }
}
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
@media screen and (max-width : 1050px) {
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
</style>