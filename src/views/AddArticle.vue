<template>
    <div>
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back"/>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="mainBox detailScoped" :style="{height: height + 'px'}">
        
            <a-form-item label="标题" class="innerBox" style="margin-top: 50px">
                <a-input allow-clear placeholder="暂无" v-model="formData.title"/>
            </a-form-item>
            <a-form-item label="标签" class="innerBox">
                <a-input allow-clear placeholder="暂无" v-model="formData.tags"/>
            </a-form-item>

            <v-md-editor v-model="formData.content" style="position: fixed; bottom: 0px" height="400px" @save="submit"></v-md-editor>
        </a-form>
    </div>
</template>

<script>
import { addArticle } from "../apis";
export default {
    name: 'AddArticle',
    data() {
        return {
            formData: {
                title: "",
                content: "",
                tags: ""
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
        async submit() {
            if(this.formData.title != "") {
                await addArticle(this.formData)
                    .then((res) => {
                        console.log(res);
                        this.$router.push("/index");
                        this.$message.success("文章更新成功");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                this.$message.error('标题不能为空', 2);
            }
            
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
    align-content: center;
    flex-direction: column;
}
.innerBox {
    margin-top: 0px;
}
.backBtn {
  position: fixed;
  left: 20px;
  top: 20px;
}
.detailScoped {
    text-align: justify;
}
</style>