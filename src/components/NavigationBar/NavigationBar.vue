<template>
  <div
    style="position: fixed; width: 100%; z-index: 1000; border-bottom:1px solid #e8e8e8"
  >
    <a-layout class="components-layout-demo-top-side layout">
      <a-layout-header class="header" style="background: #ffffff">
        <a-row>
          <a-col :span="8">
            <div>
              <p style="font-size: 20px">hanserena</p>
            </div>
          </a-col>
          <a-col :span="16">
            <a-menu
              theme="light"
              mode="horizontal"
							v-model="current"
              :default-selected-keys="['1']"
              :style="{
                lineHeight: '64px',
                display: 'flex',
                justifyContent: 'end',
              }"
            >
              <a-menu-item key="1">
                首页
              </a-menu-item>
							<a-menu-item key="2">
                分类
              </a-menu-item>
              <a-menu-item key="3">
                个人中心
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
	props: ['current'],
  data() {
    return {
			// current: ['1'],
		};
  },
	watch: {
		current(newV) {
			if (newV[0] == '1') {
				this.$router.push("/index");
			} else if (newV[0] == '2') {
				this.$router.push("/categories");
			} else if (newV[0] == '3') {
				this.$router.push("/index");
			}
		}
	}
	
};
</script>

<style scoped>
.components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
