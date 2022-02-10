<template>
    <div v-if="show">
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back" />
        <a-form
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            class="addBox detailScoped"
            :style="{ height: height + 'px' }">
            <a-form-item label="标题" class="addBox__innerBox" style="margin-top: 20px">
                <a-input allow-clear placeholder="暂无" v-model="formData.title" :maxLength="20" />
            </a-form-item>
            <a-form-item label="简介" class="addBox__innerBox">
                <a-input allow-clear placeholder="暂无" v-model="formData.brief" />
            </a-form-item>

            <a-form-item label="标签">
                <a-checkbox-group v-model="formData.tags" name="checkboxgroup" :options="tags" />
                <a-popover trigger="click" v-model="visible">
                    <template slot="content">
                        <div class="addTag">
                            <a-input placeholder="新标签" style="margin-right: 10px" v-model="newTag.name" />
                            <colorPicker v-model="newTag.color" style="margin-right: 10px" class="colorPicker" />
                            <a-button addTagLoading @click="addTagFunc"> 添加 </a-button>
                        </div>
                    </template>
                    <a-button> 添加标签 </a-button>
                </a-popover>
            </a-form-item>

            <v-md-editor
                v-model="formData.content"
                style="position: fixed; bottom: 0px"
                height="330px"
                @change="handleInputChange"
                @save="submit"></v-md-editor>
        </a-form>
        <a-modal v-model="visibleTemp" title="草稿箱" on-ok="handleOk">
            <template slot="footer">
                <a-button key="back" @click="handleCancel"> 否 </a-button>
                <a-button key="submit" type="primary" :updateLoading="updateLoading" @click="handleOk"> 上传 </a-button>
            </template>
            <p>有未提交的内容，需要上传至草稿箱吗？</p>
        </a-modal>
        <a-modal v-model="visibleGetTemp" title="草稿箱" on-ok="loadArticle">
            <template slot="footer">
                <a-button key="back" @click="notLoadArticle"> 否 </a-button>
                <a-button key="delete" @click="deleteTempArticleFunc"> 清空 </a-button>
                <a-button key="submit" type="primary" @click="loadArticle"> 导入 </a-button>
            </template>
            <p>草稿箱内有内容，需要导入吗？</p>
        </a-modal>
    </div>
</template>

<script>
import { addArticle, getAllTags, addTag, updateTempArticle, deleteTempArticle, searchTempArticle } from '../apis'
import { timeFormat } from '../utils/format.js'
import { removeArticle, setArticle, getArticle } from '../utils/storage.js'

export default {
    name: 'AddArticle',
    data() {
        return {
            formData: {
                title: '',
                content: '',
                tags: [],
                update_time: '',
                brief: ''
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
            addTagLoading: false,
            newTag: {
                name: '',
                color: '#000000'
            },
            visible: false,
            visibleTemp: false,
            visibleGetTemp: false,
            updateLoading: false,
            tempArticle: {},
            isEditingTemp: 0,
            show: false,
            textLength: 0
        };
    },
    methods: {
        async submit() {
            if (this.formData.title != '') {
                this.formData.update_time = timeFormat();
                await addArticle(this.formData)
                    .then(() => {
                        this.$message.success('文章更新成功');
                        removeArticle();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                if(this.isEditingTemp == 1) {
                    try {
                        await deleteTempArticle();
                        this.$router.push('/index');
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    this.$router.push('/index');
                }
            } else {
                this.$message.error('标题不能为空', 2);
            }
        },
        back() {
            if (this.formData.title != '' || this.formData.content != '' || this.formData.brief != '') {
                this.visibleTemp = true;
            } else {
                this.$router.push('/index');
            }
        },
        async addTagFunc() {
            try {
                await addTag({ name: this.newTag.name, color: this.newTag.color });
                this.$message.success('添加标签成功！');
                this.visible = false;
                this.newTag.name = '';
                this.newTag.color = '#000000';
                await this.getAllTagsFunc();
            } catch (err) {
                this.visible = false;
                this.newTag.name = '';
                this.newTag.color = '#000000';
            }
        },
        async getAllTagsFunc() {
            try {
                let tags = (await getAllTags()).data.data;
                let i = 0;
                this.tags = [];
                for (i; i < tags.length; i++) {
                    this.tags.push(tags[i].name);
                }
            } catch (err) {
                console.log(err);
            }
        },
        handleCancel() {
            removeArticle();
            this.$router.push('/index');
        },
        async handleOk() {
            try{
                await updateTempArticle({title: this.formData.title, content: this.formData.content, tags: this.formData.tags, brief: this.formData.brief});
                this.$message.success('草稿提交成功');
                removeArticle();
                this.$router.push('/index');
            } catch(err) {
                console.log(err);
            }
        },
        async getTempArticle() {
            try {
                this.tempArticle = (await searchTempArticle()).data.data;
                if(this.tempArticle.haveTemp == 1) {
                    setTimeout(() => {
                        this.visibleGetTemp = true;
                    }, 500);
                }
            } catch(err) {
                console.log(err);
            }
        },
        notLoadArticle() {
            this.visibleGetTemp = false;
        },
        loadArticle() {
            this.formData.title = this.tempArticle.title;
            this.formData.content = this.tempArticle.content;
            this.formData.tags = this.tempArticle.tags.split('-');
            this.formData.brief = this.tempArticle.brief;
            this.visibleGetTemp = false;
            this.$message.success('草稿导入成功');
            this.isEditingTemp = 1;
        },
        async deleteTempArticleFunc() {
            try {
                await deleteTempArticle();
                this.$message.success('草稿箱已清空~');
                this.visibleGetTemp = false;
            } catch(err) {
                console.log(err);
            }
        },
        handleInputChange(text) {
            const currentLength = text.length;
            if (currentLength - this.textLength > 10) {
                removeArticle();
                setArticle(text);
            }
        }
    },
    async mounted() {
        setTimeout(() => {
            this.show = true;
        }, 500);
        this.height = document.body.clientHeight;
        await this.getAllTagsFunc();
        await this.getTempArticle();
        const text = getArticle();
        if (text.length > 0) this.formData.content = text;
    }
};
</script>

<style scoped>
.addBox {
    display: flex;
    align-content: center;
    flex-direction: column;
}
.addBox__innerBox {
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
