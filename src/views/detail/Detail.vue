<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
<!--    <Slide :banners="topImages"></Slide>-->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
// import Slide from "components/common/swiper/slide"

import {getDetail} from "network/detail"

export default {
    name: "Detail",
    data(){
     return {
      iid:null,
      res:null,
      topImages:null
     }
    },
    components: {
      DetailSwiper,
      DetailNavBar,
    },
    created() {
     this.iid = this.$route.params.iid

     getDetail(this.iid).then(res => {
          this.topImages = res.result.itemInfo.topImages
     })
    }
  }
</script>

<style scoped>

</style>
