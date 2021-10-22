<template>
    <div class="ps">
        <NavigationBar :current="currentTab" class="ps__navigationBar--PC"/>
        <div class="ps__wrapper">
            <div class="ps__wrapper--avatar">
                <a-avatar :size="150" src="https://tomsawyer2.xyz/pics/venti.jpg" class="ps__wrapper--avatar__img"/>
                <span class="ps__wrapper--avatar__title">TomSawyer2</span>
            </div>
            <div class="ps__wrapper--stats" id="main" style="height:500%;width:100%;">
                
            </div>
        </div>
        <BottomBar :current="currentTab" class="ps__navigationBar--Mobile"/>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import BottomBar from '@/components/NavigationBar/BottomBar.vue'
import jsonp from 'jsonp'
// import echarts from 'echarts'

export default {
    name: 'PersonalSpace',
    components: { NavigationBar, BottomBar},
    data() {
        return {
            currentTab: ['3'],
            codingTime: {}
        };
    },
    mounted() {
        this.getCodingTime();
        this.init();
    },
    methods: {
        getCodingTime() {
            jsonp('https://wakatime.com/share/@080678ef-f627-4d0e-9308-3c75228698b2/d887d3db-cb31-4c53-92ae-67e96a9e9ce8.json', null, (err, data) => {
                if (err) {
                    console.log(err.message);
                } else {
                    this.codingTime = data.data;
                }
            })
        },
        init() {
            var chartDom = document.getElementById('main');
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
                text: 'Gradient Stacked Area Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            legend: {
                data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(1, 191, 236)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
                },
                {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(0, 221, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(77, 119, 255)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
                },
                {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(55, 162, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(116, 21, 219)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
                },
                {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(255, 0, 135)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(135, 0, 157)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
                },
                {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(255, 191, 0)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(224, 62, 76)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
                }
            ]
            };

            option && myChart.setOption(option);
        }
    },
    watch: {
        codingTime(newV) {
            console.log(newV);
        }
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
