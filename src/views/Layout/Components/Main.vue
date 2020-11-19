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
  flex: 1;
  width: 100%;
  padding: 10px 10px 0px 10px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  #main-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>