<template>
    <div>
        <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back"/>   
        <a-row type="flex" justify="center" class="detailScoped" :style="{height: height + 'px', alignContent: 'center'}">
            <a-card class="mainCard" hoverable :style="{maxHeight: height-50 + 'px'}">
                <v-md-editor class="magicHidden" :style="{maxHeight: height-90 + 'px', overflowY: 'hidden', height: height-90 + 'px'}" v-model="formData.content" left-toolbar="" right-toolbar="toc"></v-md-editor>
            </a-card>
        </a-row>
    </div>
</template>

<script>
import { getArticleById } from "../apis";
export default {
    name: 'Detail',
    data() {
        return {
            formData: {
                title: "",
                content: "",
                tags: "",
            },
            height: 100,
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
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
</script>

<style>
.mainCard {
    width: 70%;
    border-radius: 10px;
}
.detailScoped {
    text-align: justify;
}
.backBtn {
  position: fixed;
  left: 50px;
  top: 50px;
}
.magicHidden .v-md-editor__right-area .v-md-editor__main .v-md-editor__editor-wrapper {
    display: none;
}
</style>