<template>
    <div class="ps">
        <NavigationBar :current="currentTab" class="ps__navigationBar--PC"/>
        <div class="ps__wrapper">
            <div class="ps__wrapper--avatar">
                <a-avatar :size="150" src="https://tomsawyer2.xyz/pics/venti.jpg" class="ps__wrapper--avatar__img"/>
                <span class="ps__wrapper--avatar__title">TomSawyer2</span>
            </div>
            <div class="ps__wrapper--stats">
                <CodeTimeChart />
            </div>
        </div>
        <BottomBar :current="currentTab" class="ps__navigationBar--Mobile"/>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
import CodeTimeChart from '@/components/CodeTimeChart/CodeTimeChart.vue'

export default {
    name: 'PersonalSpace',
    components: { NavigationBar, BottomBar, CodeTimeChart },
    data() {
        return {
            currentTab: ['3']
        };
    },
    methods: {
        
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
    width: 50%;
    height: 50%;
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
</style>
