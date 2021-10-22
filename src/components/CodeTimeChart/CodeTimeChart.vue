<template>
    <div>
        <div style="height: 500%; width: 100%" id="main" />
    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
    name: 'CodeTimeChart',
    data() {
        return {
            xData: [],
            yData: [],
            data: {}
        };
    },
    methods: {
        getCodingTime() {
            jsonp('https://wakatime.com/share/@080678ef-f627-4d0e-9308-3c75228698b2/d887d3db-cb31-4c53-92ae-67e96a9e9ce8.json', null, (err, data) => {
                if (err) {
                    console.log(err.message);
                } else {
                    this.data = data.data;
                    this.init();
                }
            })
        },
        init() {
            var chartDom = document.getElementById('main');
            var myChart = this.$echarts.init(chartDom);
            var option;
            let idx = 0;
            for(idx; idx < 7; idx ++) {
                this.xData[idx] = this.data[idx].range.date;
                this.yData[idx] = this.data[idx].grand_total.decimal;
            }
            option = {
                color: ['#80FFA5'],
                title: {
                    text: '项目工作时间（小时）'
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
                    data: ['时间']
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
                        data: this.xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '时间',
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
                        data: this.yData
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    },
    mounted() {
        this.getCodingTime();
    }
};
</script>

<style scoped></style>
