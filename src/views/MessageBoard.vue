<template>
    <div v-if="show">
        <NavigationBar :current="currentTab" />
        <div style="padding-top: 200px">
            <p>暂无数据</p>
        </div>
        <BottomBar :current="currentTab" class="navigationBar--Mobile"/>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
export default {
    name: 'MessageBoard',
    components: { NavigationBar, BottomBar },
    data() {
        return {
            show: true,
            currentTab: ['3']
        };
    },
    methods: {
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
            this.$notification.open({
                message: '留言箱',
                description: '留言箱纯匿名，模仿Tape制作~',
                icon: <a-icon type="smile" style="color: #108ee9" />,
                duration: 3
            });
        }, 1000);
        
    }
};
</script>

<style scoped>
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
