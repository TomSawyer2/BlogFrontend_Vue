<template>
    <div class="a_footer">
        <div style="width:300px;margin:0px auto; padding:20px 0;">
            <a
                target="_blank"
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33060402001227"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
            >
                <img src="../../assets/beian.png" style="float:left;" />
                <p
                    style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
                >浙公网安备 33060402001227号</p>
            </a>
            <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color:#939393;"
            >浙ICP备2021032523</a>
        </div>
        <div>
            <span style="color: gray">
                本网站由
                <a
                    href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                    target="_blank"
                >
                    <img style="height: 50px;width: 50px" src="../../assets/youpaiyun.png" />
                </a>提供CDN加速/云存储服务
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
        };
    }
};
</script>

<style scoped>
.a_footer {
    width: 100%;
    margin-bottom: 50px;
}
</style>
