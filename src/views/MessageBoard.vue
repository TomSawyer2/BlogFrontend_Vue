<template>
    <div v-if="show">
        <NavigationBar :current="currentTab" />
        <div class="message__wrapper">
            <MessageCard :messagesOut="messages" @reply="replyMsg"/>
        </div>
        <BottomBar :current="currentTab" class="navigationBar--Mobile"/>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
import MessageCard from '@/components/MessageCard/MessageCard.vue'
import { getAllMessages, replyMessage } from '@/apis'
export default {
    name: 'MessageBoard',
    components: { NavigationBar, BottomBar, MessageCard },
    data() {
        return {
            show: false,
            currentTab: ['3'],
            messages: []
        };
    },
    methods: {
        async replyMsg(item) {
            try {
                await replyMessage({id: item.id, reply: item.tempReply});
                this.$message.success("回复成功");
                this.$router.go(0);
            } catch(err) {
                console.log(err);
            }
        }
    },
    async mounted() {
        setTimeout(() => {
            this.show = true;
            this.$notification.open({
                message: '留言箱',
                description: '留言箱纯匿名，模仿Tape制作~',
                icon: <a-icon type="smile" style="color: #108ee9" />,
                duration: 1
            });
        }, 1000);
        this.messages = (await getAllMessages()).data.data;
    }
};
</script>

<style scoped>
.message__wrapper {
    padding-bottom: 80px;
    padding-top: 80px;
}
.navigationBar--Mobile {
    display: none;
    position: fixed;
    bottom: 0px;
    left: 0px;
}
@media screen and (max-width: 800px) {
    .navigationBar--PC {
        display: none;
    }
    .navigationBar--Mobile {
        display: block;
    }
}
</style>
