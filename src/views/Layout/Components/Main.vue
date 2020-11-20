<template>
  <div id="main-wrap">
    <div id="main-content">
      <el-scrollbar class="scrollbar-wrapper">
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainLayout"
}
</script>
<style lang="scss" scoped>
#main-wrap {
  flex: 1;
  width: 100%;
  padding: 20px 20px 0px 20px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  #main-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .scrollbar-wrapper {
      height: 100%;
      overflow: hidden !important;
      ::v-deep .el-scrollbar__wrap {
        margin-bottom: 0 !important;
        //   margin-right: 0;
        overflow-x: auto;
        //   height: 100%;
      }
      // ::v-deep .el-scrollbar__thumb {
      //   height: 55%;
      //   transform: translateY(0%);
      // }
    }
  }
}
</style>