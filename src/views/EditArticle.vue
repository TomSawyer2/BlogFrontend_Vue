<template>
    <div>
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back"/>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="mainBox detailScoped" :style="{height: height + 'px'}">
            <a-form-item label="标题" class="innerBox" style="margin-top: 20px">
                <a-input allow-clear placeholder="暂无" v-model="formData.title"/>
            </a-form-item>

            <a-form-item label="简介" class="innerBox">
                <a-input allow-clear placeholder="暂无" v-model="formData.brief" maxLength="20"/>
            </a-form-item>

            <a-form-item label="标签">
                <a-checkbox-group
                    v-model="formData.tags"
                    name="checkboxgroup"
                    :options="tags"
                />
                <a-popover trigger="click" v-model="visible">
                    <template slot="content">
                        <div class="addTag">
                            <a-input placeholder="新标签" style="margin-right: 10px" v-model="newTag.name"/>
                            <colorPicker v-model="newTag.color" style="margin-right: 10px" class="colorPicker"/>
                            <a-button addTagLoading @click="addTagFunc">
                                添加
                            </a-button>
                        </div>
                    </template>
                    <a-button>
                        添加标签
                    </a-button>
                </a-popover>
            </a-form-item>

            <v-md-editor v-model="formData.content" style="position: fixed; bottom: 0px" height="330px" @save="submit"></v-md-editor>
        </a-form>
    </div>
</template>

<script>
import { getArticleById, updateArticle, getAllTags, addTag } from "../apis";
export default {
    name: 'EditArticle',

    data() {
        return {
            formData: {
                id: "",
                title: "",
                content: "",
                tags: [],
                brief: ""
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 }
            },
            height: 100,
            tags: [],
            visible: false,
            addTagLoading: false,
            newTag: {
                name: "",
                color: "#000000"
            }
        }
    },
    methods: {
        async submit() {
            if(this.formData.title != "") {
                await updateArticle(this.formData)
                    .then(() => {
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
        },
        async addTagFunc() {
            try{
                await addTag({name: this.newTag.name, color: this.newTag.color});
                this.$message.success("添加标签成功！");
                this.visible = false;
                this.newTag.name = "";
                this.newTag.color = "#000000";
                await this.getAllTagsFunc();
            } catch(err) {
                console.log(err);
            }
        },
        async getAllTagsFunc() {
            try{
                let tags = (await getAllTags()).data.data;
                let i = 0;
                this.tags = [];
                for(i; i < tags.length; i ++) {
                    this.tags.push(tags[i].name);
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    async mounted() {
        this.height = document.body.clientHeight;
        await getArticleById({ id: this.$route.params.id })
            .then((res) => {
                console.log(res);
                this.formData.tags = res.data.data[0].tags.split('-');
                this.formData.title = res.data.data[0].title;
                this.formData.content = res.data.data[0].content;
                this.formData.brief = res.data.data[0].brief;
                this.formData.id = res.data.data[0].id;
            })
            .catch((err) => {
                console.log(err);
            })
        await this.getAllTagsFunc();
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
  z-index: 1000;
}
.detailScoped {
    text-align: justify;
}
.addTag {
    display: flex;
    justify-content: center;
}
</style>

<style>
.colorPicker .colorBtn {
    width: 32px !important;
    height: 32px !important;
    border-radius: 5px;
}
</style>