<template>
<div class="wrapper" ref="aaaa">
  <ul class="content">
    <li>fennlei1</li>
    <li>fennlei2</li>
    <li>fennlei3</li>
    <li>fennlei4</li>
    <li>fennlei5</li>
    <li>fennlei6</li>
    <li>fennlei7</li>
    <li>fennlei8</li>
    <li>fennlei9</li>
    <li>fennlei10</li>
  </ul>
</div>

</template>

<script>
import  BScroll from 'better-scroll'
export default {
  name: 'Category',
  data() {
   return {
     scroll: null
   }
  },
  //组件创建完之后调用,要用变量来接收,避免被销毁
  //默认的情况下BSscroll是不可以实时的监听滚动的位置的
  //probe侦测
  //0,1都是不侦测实时的位置
  //2在手指滚动的过程中侦测,手指离开以后惯性滚动过程中不侦测
  //3只要是滚动都侦测
  //click属性,content里面如果有按钮就监听不到,better-scroll会阻止原生的事件,click为true可以监听到
  //pullupload上拉加载,

  mounted() {
  //第一个参数传入要管理的部分,必须有固定的高度
    this.scroll = new BScroll(this.$refs.aaaa, {
      probeType:2,
      pullUpLoad: true
    })
    // this.scroll.on('scroll',(position)=>{
    //    console.log(position)
    // })
    // this.scroll.on('pullingUp',(position)=>{
    //    console.log(position)
    // })
  }
}
</script>

<style scoped lang="stylus">
.wrapper
 height 100px
 background-color red

</style>
