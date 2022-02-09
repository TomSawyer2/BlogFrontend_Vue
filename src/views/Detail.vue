<template>
    <div v-if="show">
        <div class="trans">
            <transition-group name="slide-fade">
                <a-button shape="circle" icon="left" size="large" class="backBtn" @click="back" :key="5001" />
                <a-row
                    type="flex"
                    justify="center"
                    class="detailScoped"
                    :style="{ height: height + 'px', alignContent: 'center' }"
                    :key="5002">
                    <a-col :span="14">
                        <a-card class="mainCard trans" :style="{ maxHeight: height - 50 + 'px' }">
                            <transition name="slide-fade">
                                <v-md-editor
                                    class="magicHidden"
                                    :style="{
                                        maxHeight: height - 90 + 'px',
                                        overflowY: 'hidden',
                                        height: height - 90 + 'px'
                                    }"
                                    v-model="formData.content"
                                    left-toolbar=""
                                    right-toolbar="toc" />
                            </transition>
                        </a-card>
                    </a-col>
                    <a-col :span="5" class="sideCard">
                        <a-card class="mainCard" :style="{ maxHeight: height - 50 + 'px', marginLeft: 20 + 'px' }">
                            <SideCard
                                :articleDetail="formData"
                                :style="{
                                    maxHeight: height - 90 + 'px',
                                    overflowY: 'hidden',
                                    height: height - 90 + 'px'
                                }" />
                        </a-card>
                    </a-col>
                </a-row>
                <a-row
                    type="flex"
                    justify="center"
                    class="detailScopedMobile"
                    :style="{ height: height + 'px', alignContent: 'center', flexDirection: 'column' }"
                    :key="5003">
                    <a-col :span="24">
                        <v-md-editor
                            class="magicHidden"
                            :style="{ maxHeight: height - 20 + 'px', overflowY: 'hidden', height: height - 100 + 'px' }"
                            v-model="formData.content"
                            left-toolbar=""
                            right-toolbar="toc"></v-md-editor>
                    </a-col>
                    <a-col :span="24">
                        <a-card
                            class="mainCard"
                            :style="{
                                position: 'fixed',
                                maxHeight: height - 50 + 'px',
                                bottom: 5 + 'px',
                                width: '95%'
                            }">
                            <SideCard :articleDetail="formData" />
                        </a-card>
                    </a-col>
                </a-row>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { getArticleById } from '../apis';
import SideCard from '@/components/SideCard/SideCard.vue';
import { setDetailId, getDetailId, removeDetailId } from '@/utils/storage.js';
export default {
    name: 'Detail',
    components: { SideCard },
    data() {
        return {
            formData: {
                id: '',
                title: '',
                content: '',
                tags: '',
                tagsForShow: []
            },
            height: 100,
            id: -1,
            show: false
        };
    },
    methods: {
        back() {
            this.$router.push('/index');
            removeDetailId();
        }
    },
    async mounted() {
        setTimeout(() => {
            this.show = true;
        }, 1000);
        this.id = this.$route.params.id ? this.$route.params.id : getDetailId();
        if (this.id == -1) {
            this.$router.push('/index');
            removeDetailId();
        } else {
            setDetailId(this.id);
        }
        this.height = document.body.clientHeight;
        await getArticleById({ id: this.id })
            .then((res) => {
                if (res?.data?.status == 13) {
                    this.$router.push('/index');
                } else if (res?.data?.status == 0) {
                    setDetailId(this.id);
                    this.formData = res.data.data;
                    this.formData.tagsForShow = this.formData.tags.split('-');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>

<style>
.mainCard {
    border-radius: 8px;
}
.detailScoped {
    text-align: justify;
}
.detailScopedMobile {
    text-align: justify;
    width: 100%;
    display: none;
    padding: 0px 10px;
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
@media screen and (max-width: 1050px) {
    .sideCard {
        display: none;
    }
    .detailScoped {
        display: none;
    }
    .detailScopedMobile {
        display: block;
    }
    .backBtn {
        left: 10px;
        top: 10px;
    }
}
.trans {
    position: relative;
    overflow: hidden;
}
.slide-fade-leave-to {
    opacity: 0;
}
.slide-fade-enter-from {
    opacity: 0;
}
</style>
