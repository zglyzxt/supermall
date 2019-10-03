<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="bar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!--    <Slide :banners="topImages"></Slide>-->
      <detail-base-info :goods="goodsInfo" ></detail-base-info>
      <detail-shop-info :shop="shopInfo" ref="shopinfo"></detail-shop-info>

      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad" ref="goodsinfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from 'common/utils'
import {itemListenerMinxin} from "common/mixin"

export default {
    name: "Detail",
    data(){
     return {
      iid:null,
      res:null,
      topImages:[],
      goodsInfo:{},
      shopInfo:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{},
       recommend:[],
       themeTopY:[],
       getThemeTopY:null,
       scrollY:[],
       currentIndex:0
       // itemImageListener:null
     }
    },
    components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    mixins:[itemListenerMinxin],
    methods:{
      detailImageLoad(){
        const newRefresh = debounce(this.$refs.scroll.refresh,100)
        newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopY.length;
        for(let i=0;i<length;i++){
          if(this.currentIndex !== i && ((i<length-1&&positionY>this.themeTopY[i]&&positionY<this.themeTopY[i+1]|| (i === length-1 && positionY > this.themeTopY[i])))){
            this.currentIndex = i
            this.$refs.bar.currentIndex = this.currentIndex
          }
        }
      }
    },
    created() {
     this.iid = this.$route.params.iid

     getDetail(this.iid).then(res => {
          const data = res.result
          this.topImages = data.itemInfo.topImages
          //商品信息
          this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          // console.log(this.goodsInfo)
          this.shopInfo = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          //商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          console.log(data)

          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
     })

     getRecommend().then(res=>{
       this.recommend = res.data.list
     })

      this.getThemeTopY = debounce(()=>{
      //滚动到对应的主题
      /*
        在哪里能获取到正确的offsetTop,created里不行,压根不能获取元素.mounted不行,数据还没获取到,获取到元素的回调中也不行,DOM 也没渲染完
        $nextTick不行,因为图片的高度没有被计算在内,图片加载完以后,获取的高度才是正确的
       */
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop)
        this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      })
    },
    mounted() {
      // const newRefresh = debounce(this.$refs.scroll.refresh,100)
      // this.itemImageListener = ()=> {
      //   newRefresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position:relative;
  z-index:9;
  background-color:#ffffff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #ffffff;
}
.content{
 height: calc(100% - 44px);
}
</style>
