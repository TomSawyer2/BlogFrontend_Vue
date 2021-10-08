<template>
    <div>
        <a-card class="mainCard" hoverable>
        <a-skeleton active :loading="loading" avatar>
            <a-card hoverable class="articles" v-for="(item, index) in items" :key="index">
                <a-card-meta @click="toDetail(item)">
                    <a-avatar
                        slot="avatar"
                        src="http://175.24.30.102:8080/pics/venti.jpg"
                    />
                    <a slot="title" >{{ item.title }}</a>
                </a-card-meta>
                <a-row type="flex" justify="end" style="margin-top: 30px">
                    <a-col :offset="1">
                        {{item.update_time ? item.update_time : ""}}
                    </a-col>
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
            </a-skeleton>
        </a-card>
    </div>
</template>

<script>
import { getAllArticle, deleteArticle } from "@/apis";
export default {
    name: 'Article',
    data() {
        return {
            items: [],
            deleteDialog: false,
            loading: true,
            deleteItem: {},
        }
    },
    async mounted() {
        try {
            this.items = (await getAllArticle()).data.data;
            this.items.forEach(function (item) {
                if(item.content) {
                    if(item.content.length > 20) {
                        item.briefContent = item.content.substr(0, 20) + '...';
                    } else {
                        item.briefContent = item.content;
                    }
                }
            })
            this.loading = false;
        } catch(err) {
            console.log(err);
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
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
}
</style>