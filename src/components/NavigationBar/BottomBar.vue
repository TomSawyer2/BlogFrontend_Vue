<template>
    <div style="width: 100%; z-index: 1000; border-bottom: 1px solid #e8e8e8">
        <a-layout class="components-layout-demo-top-side layout">
            <a-layout-header class="header" style="background: #ffffff">
                <a-row>
                    <a-col :span="24" class="extraItems">
                        <a-menu
                            theme="light"
                            mode="horizontal"
                            v-model="current"
                            :default-selected-keys="['1']"
                            :style="{
                                lineHeight: '64px',
                                display: 'flex',
                                justifyContent: 'center'
                            }">
                            <a-menu-item key="1" :span="8"> 首页 </a-menu-item>
                            <a-menu-item key="2" :span="8"> 分类 </a-menu-item>
                            <a-menu-item key="3" :span="8"> 个人中心 </a-menu-item>
                        </a-menu>
                    </a-col>
                </a-row>
            </a-layout-header>
        </a-layout>
    </div>
</template>

<script>
export default {
    name: 'BottomBar',
    props: ['current'],
    data() {
        return {
            // current: ['1'],
        };
    },
    watch: {
        current(newV) {
            if (newV[0] == '1') {
                this.$router.push('/index');
            } else if (newV[0] == '2') {
                this.$router.push('/categories');
            } else if (newV[0] == '3') {
                this.$router.push('/index');
            }
        }
    }
};
</script>

<style scoped>
.mainBar {
    display: none;
}
@media screen and (max-width: 800px) {
    .mainBar {
        display: block;
    }
}
</style>
