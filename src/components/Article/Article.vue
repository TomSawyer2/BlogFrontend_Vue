<template>
    <div>
        <a-card style="" class="mainCard" hoverable>
            <a-card hoverable class="articles" v-for="(item, index) in items" :key="index">
                <a-card-meta :title='item.title' :description='item.briefContent' @click="toDetail(item)">
                    <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                </a-card-meta>
                <a-row type="flex" justify="end" style="margin-top: 10px">
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
                        <a-icon key="delete" type="delete" style="fontSize: 18px" @click="openDeleteDialog(item)"/>
                        <a-modal v-model="deleteDialog" title="Title" on-ok="handleOk">
                            <template slot="footer">
                                <a-button key="back" @click="handleCancel">
                                    返回
                                </a-button>
                                <a-button key="submit" type="primary" :loading="loading" @click="handleOk()">
                                    确定
                                </a-button>
                            </template>
                            </a-modal>
                    </a-col>
                </a-row>
            </a-card>
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
            loading: false,
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
        } catch(err) {
            console.log(err);
        }
    },
    methods: {
        openDeleteDialog(item) {
            this.deleteItem = item;
            this.deleteDialog = true;
        },
        async handleOk() {
            try{
                await deleteArticle({id: this.deleteItem.id});
                this.$message.success("删除成功！");
                this.deleteDialog = false;
                this.deleteItem = {};
                this.items = (await getAllArticle()).data.data;
            } catch(err) {
                this.$message.error("发生了一些错误");
            }
        },
        handleCancel() {
            this.deleteDialog = false;
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