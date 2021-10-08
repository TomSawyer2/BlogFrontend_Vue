<template>
    <div>
		<a-card title="标签" hoverable>
			<a-skeleton active :loading="loading">
				<span v-for="(tag, index) in tags" :key="index">
					<a-tag :color="tag.color" class="tags">
						{{tag.name}}
					</a-tag>
				</span>
			</a-skeleton>
		</a-card>
    </div>
</template>

<script>
import { getAllTags } from "@/apis";
export default {
    name: 'SideBar',
    data() {
        return {
			tags: [],
			loading: true,
        }
    },
    methods: {
        
    },
	async mounted() {
		try{
			this.tags = (await getAllTags()).data.data;
			this.loading = false;
		} catch(err) {
			console.log(err);
		}
	}
}
</script>

<style scoped>
.tags {
	margin-bottom: 15px;
	font-size: 15px; 
}
</style>