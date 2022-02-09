<template>
    <div>
        <div style="height: 500%; width: 100%" id="langChart" />
    </div>
</template>

<script>
import jsonp from "jsonp";
export default {
    name: 'CodeLangChart',
    data() {
        return {
            xData: [],
            seriesData: [],
            data: {},
            newSeriesData: []
        };
    },
    methods: {
        getCodingLanguage() {
            jsonp(
                'https://wakatime.com/share/@TomSawyer2/e938f6f0-c95a-4ec6-81a2-b5faa9cd54f5.json',
                { format: 'jsonp' },
                (err, data) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        this.data = data.data;
                        this.init();
                    }
                }
            );
        },
        init() {
            var chartDom = document.getElementById('langChart');
            var myChart = this.$echarts.init(chartDom);
            var option;
            let idx = 0;
            for (idx; idx < this.data.length; idx++) {
                this.xData[idx] = this.data[idx].name;
                this.seriesData.push({ value: this.data[idx].percent, name: this.data[idx].name });
            }
            this.newSeriesData = this.seriesData.reverse();
            option = {
                title: {
                    text: '编程语言',
                    subtext: '近一月',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '编程语言',
                        type: 'pie',
                        radius: '100%',
                        top: 'center',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.newSeriesData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    },
    mounted() {
        this.getCodingLanguage();
    }
};
</script>

<style scoped></style>
