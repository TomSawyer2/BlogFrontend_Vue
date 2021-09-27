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
                <a-row type="flex" justify="end">
                    <a-col :span="1">
                        <a-icon key="like" type="like" style="fontSize: 18px"/>
                    </a-col>
                    <a-col :span="1">
                        <a-icon key="message" type="message" style="fontSize: 18px" />
                    </a-col>
                    <a-col :span="1">
                        <a-icon key="edit" type="edit" style="fontSize: 18px" @click="toEdit(item)"/>
                    </a-col>
                    <a-col :span="1">
                        <a-icon key="ellipsis" type="ellipsis" style="fontSize: 18px" />
                    </a-col>
                </a-row>
            </a-card>
        </a-card>
    </div>
</template>

<script>
import { getAllArticle } from "@/apis";
export default {
    name: 'Article',
    data() {
        return {
            items: []
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
        toEdit(item) {
            this.$router.push({path: "/editArticle", name: "EditArticle", params: { id: item.id }});
        },
        toDetail(item) {
            this.$router.push({path: "/detail", name: "Detail", params: { id: item.id }});
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
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
}
</style>