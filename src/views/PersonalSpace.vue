<template>
    <div v-if="show">
        <div class="ps">
            <transition-group name="slide-fade">
                <NavigationBar :current="currentTab" :key="7001" class="ps__navigationBar--PC"/>
                <div class="ps__wrapper" :key="7002">
                    <div class="ps__wrapper--avatar">
                        <a-avatar :size="150" src="https://blog.tomsawyer2.xyz/pics/venti.jpg" class="ps__wrapper--avatar__img"/>
                        <span class="ps__wrapper--avatar__title">TomSawyer2</span>
                    </div>
                    <div class="ps__wrapper--stats__wrapper">
                        <CodeTimeChart class="ps__wrapper--stats"/>
                        <CodeLangChart class="ps__wrapper--stats"/>
                    </div>
                </div>
                <BottomBar :key="7003" :current="currentTab" class="ps__navigationBar--Mobile"/>
            </transition-group>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
import CodeTimeChart from '@/components/CodeChart/CodeTimeChart.vue'
import CodeLangChart from '@/components/CodeChart/CodeLangChart.vue'

export default {
    name: 'PersonalSpace',
    components: { NavigationBar, BottomBar,  CodeLangChart ,CodeTimeChart},
    data() {
        return {
            currentTab: ['4'],
            show: false
        };
    },
    methods: {
        
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 1000);
    }
};
</script>

<style scoped>
.ps {

}
.ps__navigationBar--PC {

}
.ps__navigationBar--Mobile {
    display: none;
    position: fixed;
    bottom: 0px;
    left: 0px;
}
.ps__wrapper--avatar {
    padding-top: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.ps__wrapper--avatar__img {

}
.ps__wrapper--avatar__title {
    display: flex;
    font-size: 40px;
    align-items: center;
    margin-left: 100px;
}
.ps__wrapper--stats {
    width: 35%;
    height: 35%;
}
.ps__wrapper--stats__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
@media screen and (max-width: 930px) {
    .ps__wrapper--stats__wrapper {
        flex-direction: column;
    }
    .ps__wrapper--stats {
        margin: auto;
        width: 95%;
        height: 100%;
    }
    .ps__wrapper--avatar__title {
        font-size: 30px;
    }
}
@media screen and (max-width: 800px) {
    .ps__navigationBar--PC {
        display: none;
    }
    .ps__navigationBar--Mobile {
        display: block;
    }
    .ps__wrapper--avatar {
        padding-top: 20px;
    }
    .ps__wrapper--avatar__title {
        margin-left: 5px;
    }
}
.ps {
    position: relative;
    overflow: hidden;
    min-height: 200px;
}
.slide-fade-leave-to {
    opacity: 0;
}
.slide-fade-enter-from {
    opacity: 0;
}
</style>
