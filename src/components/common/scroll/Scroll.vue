<template>
<!--绑定给子组件上,
ref如果是绑定在组件中的,那么通过this.$refs.refname获取到的是一个组件对象
如果是在普通的元素中,那么通过获取到的是一个元素对象
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
     probeType: {
       type: Number,
       default: 0
     },
     pullUpLoad: {
       type: Boolean,
       default: false
     },
    },
    data(){
     return {
      scroll: null
     }
    },
    mounted() {
     this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          //直接设置3，实时监听,影响性能
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
     })

       //监听滚动的区域
       this.scroll.on('scroll',(position)=>{
         this.$emit('scroll', position)
       })

      // 3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          console.log('滚动底部')
        })
      }
    },
    methods:{
     scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
     },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log('-----')
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }

  }
</script>

<style scoped>

</style>
