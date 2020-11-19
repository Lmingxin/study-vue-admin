
<template >
  <svg class="classIcon" :style="{fontSize:fontSize,fill: 'currentColor',color:color}"
    aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed,onMounted,reactive,ref } from '@vue/composition-api'
export default {
  name: 'icon-svg',

  props: {
    iconClass: {  //图标名称
      type: String,
      required: true,
      default: ""
    },
    iconSize: {   //图标大小
      type: String,
      default: "20"
    },
    iconColor: {  //图标颜色
      type: String,
      default: "#cdcdcd"
    }
  },
  setup(props,context) {  //主入口，data,生命周期，methods等
    const iconName=computed(() => {
      return `#icon-${props.iconClass}`;
    })
    const fontSize=computed(() => {
      return `${props.iconSize}px`;
    })
    const color=computed(() => {
      return ''+props.iconColor;
    })
    return {
      iconName,
      fontSize,
      color
    }
  },
  // computed: {
  //   iconName() {
  //     console.log(this.iconClass);
  //     return `#icon-${this.iconClass}`
  //   }
  // }
}
</script>

<style>
.classIcon {
  width: 2em;
  height: 2em;
  /* vertical-align: -0.1em; */

  margin: 5px;
  fill: currentColor;
  color: #fff;
  overflow: hidden;
}
</style>
