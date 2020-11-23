<template>
  <div id="layout-wrap" :class="[menuStatus ? 'close' : 'open']">
    <NavLayout />
    <div id="content-wrap">
      <HeaderLayout />
      <el-scrollbar class="scrollbar-wrapper">
        <MainLayout />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
import HeaderLayout from './Components/Header'
import NavLayout from './Components/Nav'
import MainLayout from './Components/Main'
export default {
  name: "layout",
  components: {
    HeaderLayout,
    NavLayout,
    MainLayout
  },
  setup(props,context) {
    const menuStatus=computed(() => context.root.$store.getters.getIsCollapse);
    return {
      menuStatus
    }
  }


}
</script>
<style lang="scss" scoped>
#layout-wrap {
  height: 100vh;
  display: flex;
  #content-wrap {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    .scrollbar-wrapper {
      flex: 1;
      overflow: hidden !important;
      ::v-deep .el-scrollbar__wrap {
        margin-bottom: 0 !important;
        //   margin-right: 0;
        overflow-x: auto;
        //   height: 100%;
        .el-scrollbar__view {
          height: 100%;
        }
      }
      // ::v-deep .el-scrollbar__thumb {
      //   height: 55%;
      //   transform: translateY(0%);
      // }
    }
  }
}
</style>