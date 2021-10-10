<template>
    <div>
        <div class="mainCard">
            <a-skeleton active :loading="loading" avatar>
                <a-timeline pending="没有更多内容了~~" :reverse="reverse" class="finalDot">
                    <a-timeline-item v-for="(item, index) in items" :key="index">
                        <p class="time" style="margin-left: 20px">{{ item.update_time ? item.update_time : "" }}</p>
                        <a-card hoverable class="articles" style="margin-left: 20px">
                            <a-card-meta @click="toDetail(item)">
                                <a-avatar
                                    slot="avatar"
                                    :size="40"
                                    src="http://175.24.30.102:8080/pics/venti.jpg"
                                />
                                <a slot="title" style="display: flex; font-size: 18px; margin-left: 30px">{{ item.title }}</a>
                                <a slot="description" style="display: flex; font-size: 15px; margin-left: 30px; color: black">{{ item.brief ? item.brief : "暂无简介~" }}</a>
                            </a-card-meta>
                            <a-row type="flex" justify="start" style="margin-top: 15px; margin-left: 85px;">
                                <a-col>
                                    <span v-for="(tag, index) in item.tagsForShow" :key="index">
                                        <a-tag color="blue" class="tags">
                                            {{tag}}
                                        </a-tag>
                                    </span>
                                </a-col>
                            </a-row>
                            <a-divider class="divider"/>
                            <a-row type="flex" justify="end" style="margin-top: 10px">
                                <a-col :offset="1">
                                    <a-icon key="like" type="like" style="fontSize: 18px"/>
                                </a-col>
                                <a-col :offset="1">
                                    <a-icon key="message" type="message" style="fontSize: 18px" />
                                </a-col>
                                <a-col :offset="1">
                                    <a-icon key="edit" type="edit" style="fontSize: 18px" @click="toEdit(item)"/>
                                </a-col>
                                <a-col :offset="1">
                                    <a-popover trigger="click">
                                        <template slot="content">
                                            <a slot="content" @click="deleteArticleFunc(item)">删除</a>
                                        </template>
                                        <a-icon key="delete" type="delete" style="fontSize: 18px" />
                                    </a-popover>
                                </a-col>
                        </a-row>
                        </a-card>
                    </a-timeline-item>
                </a-timeline>
            </a-skeleton>
        </div>
    </div>
</template>

<script>
import { getAllArticle, deleteArticle } from "@/apis";
export default {
    name: 'Article',
    props: ['reverse', 'articles', 'loading'],
    data() {
        return {
            items: [],
            deleteDialog: false,
            deleteItem: {},
        }
    },
    methods: {
        async deleteArticleFunc(item) {
            try{
                await deleteArticle({id: item.id});
                this.$message.success("删除成功！");
                this.items = (await getAllArticle()).data.data;
            } catch(err) {
                this.$message.error("发生了一些错误");
            }
        },
        toEdit(item) {
            this.$router.push({path: "/editArticle", name: "EditArticle", params: { id: item.id }});
        },
        toDetail(item) {
            this.$router.push({path: "/detail", name: "Detail", params: { id: item.id }});
        },
    },
    watch: {
        articles(newV) {
            this.items = newV;
        }
    }
}
</script>

<style scoped>
.mainCard {
    width: 85%;
    margin-bottom: 50px;
    border-radius: 10px;
}
.actions {
    display: flex;
    justify-content:  flex-end;
}
.articles {
    margin-top: 5px;
    margin-bottom: 30px;
    justify-content: center;
}
.tags {
	margin-bottom: 15px;
	font-size: 15px; 
}
.ant-divider-horizontal {
    margin-top: 10px;
}
.time {
    display: flex;
    margin-left: 10px;
}
</style>