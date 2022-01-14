<template>
    <div class="cards">
        <div class="cards__card" v-for="(item, index) in messages" :key="item.id">
            <a-card hoverable @click="openCard(item, index)">
                <p>{{ item.content }}</p>
                <span class="cards__card--time">{{ item.update_time }}</span>
                <div :style="{ display: item.showReply == 1 ? 'block' : 'none' }">
                    <p>{{ item.reply ? item.reply : "暂无回复" }}</p>
                    <a-textarea
                        v-if="!item.reply && isLogin"
                        v-model="item.temp_reply"
                        placeholder="输入回复"
                        @click.stop
                        :auto-size="{ minRows: 2, maxRows: 6 }"
                        class="cards__card--replyBox" />
                    <a-button-group class="cards__card--actions" v-if="!item.reply && isLogin">
                        <a-button style="margin-right: 10px">取消</a-button>
                        <a-button type="primary" @click.stop @click="submitReply(item)"> 提交 </a-button>
                    </a-button-group>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/storage.js'
export default {
    name: 'MessageBox',
    props: ['messagesOut', 'reply'],
    data() {
        return {
            openItem: -1,
            messages: [],
            isLogin: getToken() ? true : false
        };
    },
    methods: {
        openCard(item, index) {
            if (item.showReply == 1) {
                item.showReply = 0;
                this.openItem = -1;
            } else {
                item.showReply = 1;
                if (this.openItem != -1) {
                    this.messages[this.openItem].showReply = 0;
                }
                this.openItem = index;
            }
        },
        submitReply(item) {
            this.$emit('reply', item);
        }
    },
    mounted() {
        this.messages = this.messagesOut;
    }
};
</script>

<style scoped>
.ant-card {
    border-radius: 5px;
}
.ant-card-bordered {
    border: 2px solid #e8e8e8;
}
.cards {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.cards__card {
    padding: 10px 0;
    width: 500px;
}
.cards__card--time {
    display: flex;
    margin-left: 5px;
    color: #928f8fd5;
}
.cards__card--reply {
    display: none;
}
.cards__card--replyBox {
    margin-top: 20px;
}
.cards__card--actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
@media screen and (max-width: 800px) {
    .cards__card {
        width: calc(100% - 50px);
    }
}
</style>
