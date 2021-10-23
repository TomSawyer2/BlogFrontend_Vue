<template>
    <div>
        <a-card title="标签" hoverable>
            <a-skeleton active :loading="loading">
                <span v-for="(tag, index) in tags" :key="index">
                    <a-tag :color="tag.color" class="tags" @click="clickTag(tag)">
                        {{ tag.name }}
                    </a-tag>
                </span>
            </a-skeleton>
        </a-card>
        <a-card title="联系博主" hoverable style="margin-top: 15px">
            <p style="margin-bottom: 5px">QQ: 6272867</p>
            <p style="margin-bottom: 5px">Github: <a href="https://github.com/TomSawyer2">TomSawyer2</a></p>
            <p style="margin-bottom: 5px">Gitee: <a href="https://gitee.com/hanserena">hanserena</a></p>
            <p style="margin-bottom: 0px">备案号：<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2021032523</a></p>
        </a-card>
    </div>
</template>

<script>
import { getAllTags } from '@/apis';
export default {
    name: 'SideBar',
    data() {
        return {
            tags: [],
            loading: true
        };
    },
    methods: {
        clickTag(tag) {
            this.$router.push({ path: '/categories', name: 'Categories', params: { tag: tag } });
        }
    },
    async mounted() {
        try {
            this.tags = (await getAllTags()).data.data;
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    }
};
</script>

<style scoped>
.tags {
    margin-bottom: 10px;
    font-size: 15px;
}
</style>
