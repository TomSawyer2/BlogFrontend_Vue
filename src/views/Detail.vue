<template>
    <div>
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back"/>   
        <a-row type="flex" justify="center" class="detailScoped" :style="{height: height + 'px', alignContent: 'center'}">
            <a-col :span="14">
                <a-card class="mainCard" :style="{maxHeight: height-50 + 'px'}">
                    <v-md-editor class="magicHidden" :style="{maxHeight: height-90 + 'px', overflowY: 'hidden', height: height-90 + 'px'}" v-model="formData.content" left-toolbar="" right-toolbar="toc"></v-md-editor>
                </a-card>
            </a-col>
            <a-col :span="5">
                <a-card class="mainCard" :style="{maxHeight: height-50 + 'px', marginLeft: 20 + 'px'}">
                    <SideCard :articleDetail="formData" :style="{maxHeight: height-90 + 'px', overflowY: 'hidden', height: height-90 + 'px'}"/>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { getArticleById } from "../apis";
import SideCard from "@/components/SideCard/SideCard.vue";
export default {
    name: 'Detail',
    components: { SideCard },
    data() {
        return {
            formData: {
                title: "",
                content: "",
                tags: "",
                tagsForShow: []
            },
            height: 100
        }
    },
    methods: {
        back() {
            this.$router.push("/index");
        }
    },
    async mounted() {
        this.height = document.body.clientHeight;
        await getArticleById({ id: this.$route.params.id })
            .then((res) => {
                console.log(res);
                this.formData = res.data.data[0];
                this.formData.tagsForShow = this.formData.tags.split('-');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
</script>

<style>
.mainCard {
    border-radius: 8px;
}
.detailScoped {
    text-align: justify;
}
.backBtn {
  position: fixed;
  left: 50px;
  top: 50px;
  z-index: 1000;
}
.magicHidden .v-md-editor__right-area .v-md-editor__main .v-md-editor__editor-wrapper {
    display: none;
}
</style>