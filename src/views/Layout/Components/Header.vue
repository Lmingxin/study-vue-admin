<template>
  <div id="header-wrap">
    <div @click="MenuState()">
      <svg-icon :icon-class="!iconState?'menu2':'menu'" icon-color="#333" icon-size="10" />
    </div>

    <div class="user">
      <div class="user-info">
        <el-image style="width: 40px; height: 40px"
          :src="require('@/assets/999ab71071d25dd9f10d73680665a3b5.jpg')" fit="fit"></el-image>
        <div class="username">{{username}}</div>
      </div>

      <div @click="removeUserInfo()">
        <svg-icon icon-class="unlogin" icon-color="#333" icon-size="10" />
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
// import getMap
export default {
  name: "Header",
  setup(props,context) {  //主入口，data,生命周期，methods等
    const iconState=ref(false)
    const username=computed(() => {
      return context.root.$store.getters.getStoreuserName;
    })
    const MenuState=() => {

      context.root.$store.commit("setIsCollapse")

      console.log(context.root.$store.state.isCollapse);
      iconState.value=context.root.$store.state.isCollapse
    }
    const removeUserInfo=() => {
      context.root.$store.commit("REMOVE_USERINFO");
      context.root.$router.push({
        name: "Login"
      });
    }

    return {
      MenuState,
      iconState,
      username,
      removeUserInfo
    }
  }
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