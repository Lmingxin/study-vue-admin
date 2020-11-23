<template>
  <div id="main-wrap">
    <div id="main-content">
      <router-view></router-view>
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
  // flex: 1;
  width: 100%;
  box-sizing: border-box;
  // height: auto;
  padding: 20px 20px 0px 20px;
  background-color: #f7f7f7;
  #main-content {
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>