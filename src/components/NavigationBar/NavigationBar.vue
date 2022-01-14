<template>
    <div style="position: fixed; width: 100%; z-index: 1000; border-bottom: 1px solid #e8e8e8; top: 0px">
        <a-layout class="components-layout-demo-top-side layout">
            <a-layout-header class="header" style="background: #ffffff">
                <a-row>
                    <a-col :span="8">
                        <div>
                            <p style="font-size: 20px" @click="openLoginForm()">TomSawyer2</p>
                            <a-modal v-model="loginVisible" title="管理员登录" @ok="loginFunc()">
                                <a-input placeholder="账号" allow-clear v-model="loginParams.userName" />
                                <a-input-password v-model="loginParams.password" placeholder="密码" style="margin-top: 20px"/>
                            </a-modal>
                            <a-modal v-model="logoutVisible" title="注销" @ok="logoutFunc()">
                                <p>确定注销吗？</p>
                            </a-modal>
                        </div>
                    </a-col>
                    <a-col :span="16" class="extraItems">
                        <a-menu
                            theme="light"
                            mode="horizontal"
                            v-model="currentLocal"
                            :default-selected-keys="['1']"
                            :style="{
                                lineHeight: '64px',
                                display: 'flex',
                                justifyContent: 'end'
                            }">
                            <a-menu-item key="1"> 首页 </a-menu-item>
                            <a-menu-item key="2"> 分类 </a-menu-item>
                            <a-menu-item key="3"> 留言箱 </a-menu-item>
                            <a-menu-item key="4"> 个人中心 </a-menu-item>
                        </a-menu>
                    </a-col>
                </a-row>
            </a-layout-header>
        </a-layout>
    </div>
</template>

<script>
import { login } from '@/apis'
import { setToken, getToken, removeToken } from '@/utils/storage.js'
export default {
    name: 'NavigationBar',
    props: ['current'],
    data() {
        return {
            currentLocal: ['1'],
            loginVisible: false,
            logoutVisible: false,
            loginParams: {
                userName: '',
                password: ''
            },
            isLogin: getToken() ? true : false
        };
    },
    mounted() {
        this.currentLocal = this.current;
    },
    methods: {
        openLoginForm() {
            if(this.isLogin == true) {
                this.logoutVisible = true;
            } else {
                this.loginVisible = true;
            }
        },
        async loginFunc() {
            try {
                let token = (await login(this.loginParams)).data.data;
                setToken(token);
                this.loginParams = {};
                this.$message.success("登录成功");
                this.loginVisible = false;
                this.$router.go(0);
                this.isLogin = true;
            } catch(err) {
                console.log(err);
            }
        },
        logoutFunc() {
            removeToken();
            this.$router.go(0);
            this.logoutVisible = false;
            this.isLogin = false;
        }
    },  
    watch: {
        currentLocal(newV) {
            if (newV[0] == '1') {
                this.$router.push('/index').catch(() => {});
            } else if (newV[0] == '2') {
                this.$router.push('/categories').catch(() => {});
            } else if (newV[0] == '3') {
                this.$router.push('/messageBoard').catch(() => {});
            } else if (newV[0] == '4') {
                this.$router.push('/personalSpace').catch(() => {});
            }
        }
    }
};
</script>

<style scoped>
.components-layout-demo-top-side .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
}
@media screen and (max-width: 800px) {
    .extraItems {
        display: none;
    }
}
</style>
