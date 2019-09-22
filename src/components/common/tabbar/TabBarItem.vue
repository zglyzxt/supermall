<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    插槽外面包一个div,用来替换其他属性-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
    // home -> item1(/home) = true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped lang="stylus">
/*颜色要动态封装*/
  /*.active*/
  /*  color: #f00*/
  .tab-bar-item
    flex:1
    text-align: center
    height: 49px//很多高度都是49px
    font-style: 14px
    img
      height: 24px
      width: 24px
      margin-top:3px
      vertical-align: middle
      margin-bottom:2px

</style>
