<template>
    <swiper class="swiper" >
      <swiper-item v-for="(item,index) in topImages" :key="index" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
     Swiper,
     SwiperItem
    },
    props: {
     topImages: {
      type:Array,
      default() {
        return []
      }
     }
    }
  }
</script>

<style scoped lang="stylus">
.swiper
 height 300px
 overflow hidden
</style>
