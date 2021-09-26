<template>
    <div>
        <a-card style="" class="mainCard">
            <a-card hoverable class="articles" v-for="(item, index) in items" :key="index">
                <a-card-meta :title='item.title' :description='item.content'>
                    <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                </a-card-meta>
                <a-row type="flex" justify="end">
                    <a-col :span="1">
                        <a-icon key="like" type="like" />
                    </a-col>
                    <a-col :span="1">
                        <a-icon key="message" type="message" />
                    </a-col>
                    <a-col :span="1">
                        <a-icon key="ellipsis" type="ellipsis" />
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
            items: [
            ]
        }
    },
    async mounted() {
        try {
            this.items = (await getAllArticle()).data.data;
        } catch(err) {
            console.log(err);
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
    min-height: 150px;
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
}
</style>