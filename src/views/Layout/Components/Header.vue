<template>
  <div id="header-wrap">
    <svg-icon icon-class="menu2" icon-color="#333" icon-size="10" />
    <div class="user">
      <div class="user-info">
        <el-image style="width: 40px; height: 40px"
          :src="require('@/assets/999ab71071d25dd9f10d73680665a3b5.jpg')" fit="fit"></el-image>
        <div class="username">管理员</div>
      </div>
      <svg-icon icon-class="unlogin" icon-color="#333" icon-size="10" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
#header-wrap {
  height: 60px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  svg {
    cursor: pointer;
  }
  .user {
    display: flex;
    align-items: center;
    .user-info {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .username {
        margin-left: 15px;
      }
    }
  }
}
</style>