<template>
	<div class="wordCloud" :style="{height: height + 'px'}">
		<div id="echartsWordcloud" class="innerCloud"></div>
	</div>
</template>

<script>
import { getAllTags } from "@/apis";
export default {
  name: "WordCloudChart",
	data() {
		return {
			height: 100,
			tags: [],
      cloudHeight: 100,
      cloudWidth: 100
		}
	},
  async mounted() {
		try {
			this.tags = (await getAllTags()).data.data;
		} catch(err) {
			console.log(err);
		}
		this.height = document.body.clientHeight;
    this.cloudHeight = document.body.clientHeight - 100;
    this.cloudWidth = document.body.clientWidth;
    this.initEcharts();
  },
  methods: {
    initEcharts() {
			let that = this;
      let echartsWordcloud = this.$echarts.init(
        document.getElementById("echartsWordcloud")
      );
      let option = {
        title: {
          text: "",
          x: "center"
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 30,
            //用来调整字的大小范围
            sizeRange: [30, 50],
            rotationRange: [0, 0],
            //随机生成字体颜色
            textStyle: {
              color: function() {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              }
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "400%",
            height: "400%",
            //数据
            data: this.tags
          }
        ]
      };
      echartsWordcloud.setOption(option);
      //点击事件
      echartsWordcloud.on("click", function(e) {
				that.$emit("tagData", e.data);
      });
    }
  }
};
</script>

<style>
.wordCloud {
	display: flex;
	justify-content: center;
	align-items: center;
}
.innerCloud {
	width: 1000px;
	height: 600px;
}
</style>