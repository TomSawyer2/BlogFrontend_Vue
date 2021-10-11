<template>
    <div>
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back"/>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="mainBox detailScoped" :style="{height: height + 'px'}">
        
        <a-form-item label="标题" class="innerBox" style="margin-top: 20px">
            <a-input allow-clear placeholder="暂无" v-model="formData.title" :maxLength='20'/>
        </a-form-item>
        <a-form-item label="简介" class="innerBox">
            <a-input allow-clear placeholder="暂无" v-model="formData.brief"/>
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
        <a-modal v-model="visibleTemp" title="草稿箱" on-ok="handleOk">
            <template slot="footer">
                <a-button key="back" @click="handleCancel">
                    否
                </a-button>
                <a-button key="submit" type="primary" :updateLoading="updateLoading" @click="handleOk">
                    上传
                </a-button>
            </template>
            <p>有未提交的内容，需要上传至草稿箱吗？</p>
        </a-modal>
    </div>
</template>

<script>
import { addArticle, getAllTags, addTag } from "../apis";
export default {
    name: 'AddArticle',
    data() {
        return {
            formData: {
                title: "",
                content: "",
                tags: [],
                update_time: "",
                brief: "",
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
            height: 100,
            tags: [],
            addTagLoading: false,
            newTag: {
                name: "",
                color: "#000000",
            },
            visible: false,
            visibleTemp: false,
            updateLoading: false,
        }
    },
    methods: {
        async submit() {
            if(this.formData.title != "") {
                // 获取时间
                var nowDate = new Date();
                var year = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
                var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
                var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
                var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
                var dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
                this.formData.update_time = dateStr;
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
            if(this.formData.title != "" || this.formData.content != "" || this.formData.brief != "") {
                this.visibleTemp = true;
            }
            // this.$router.push("/index");
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
                this.visible = false;
                this.newTag.name = "";
                this.newTag.color = "#000000";
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
        },
        handleCancel() {
            this.$router.push("/index");
        },
        async handleOk() {
            this.$message.error("功能还未做完")
            // try{
            //     // await 
            // }
        }
    },
    async mounted() {
        this.height = document.body.clientHeight;
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