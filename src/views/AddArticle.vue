<template>
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="mainBox" :style="{height: height + 'px'}">
    
        <a-form-item label="标题" class="innerBox">
            <a-input allow-clear placeholder="暂无" v-model="formData.title"/>
        </a-form-item>

        <a-form-item label="正文" class="innerBox">
            <a-input allow-clear placeholder="暂无" v-model="formData.content"/>
        </a-form-item>

    </a-form>
</template>

<script>
export default {
    name: 'AddArticle',
    data() {
        return {
            formData: {
                title: "",
                content: ""
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 9 },
            },
            height: 100,
        }
    },
    methods: {
        submit() {
            console.log(this.formData)
        },
        back() {
            this.$router.push("/index");
        }
    },
    mounted() {
        this.height = document.body.clientHeight;
    }
}
</script>

<style scoped>
.mainBox {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
.innerBox {
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>