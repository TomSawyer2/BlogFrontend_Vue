<template>
    <div>
        <p class="title">{{ articleDetail.title }}</p>
        <div style="display: flex; justify-content: center; flex-wrap: wrap">
            <span v-for="(tag, index) in articleDetail.tagsForShow" :key="index">
                <a-tag color="blue" class="tags">
                    {{ tag ? tag : "暂无" }}
                </a-tag>
            </span>
        </div>
        <p class="brief">{{ articleDetail.brief ? articleDetail.brief : "暂无简介~" }}</p>
        <a-divider />
        <div class="personalInformation">
            <a-avatar
                slot="avatar"
                :size="40"
                src="https://tomsawyer2.xyz/pics/venti.jpg"
            />
            <span class="username">hanserena</span>
        </div>
        <a-divider />
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
</style>