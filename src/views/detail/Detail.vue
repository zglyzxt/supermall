<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!--    <Slide :banners="topImages"></Slide>-->
      <detail-base-info :goods="goodsInfo" ></detail-base-info>
      <detail-shop-info :shop="shopInfo" ref="shopinfo"></detail-shop-info>

      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ref="goodsinfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
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
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"

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
       recommend:[]
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
      GoodsList,
      Scroll
    },
    created() {
     this.iid = this.$route.params.iid

     getDetail(this.iid).then(res => {
          const data = res.result
          this.topImages = data.itemInfo.topImages
          this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          console.log(this.goodsInfo)
          this.shopInfo = new Shop(data.shopInfo)
       this.detailInfo = data.detailInfo
       //商品参数信息
       this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

       if(data.rate.cRate !== 0) {
         this.commentInfo = data.rate.list[0]
       }
     })

     getRecommend().then(res=>{
       this.recommend = res.data.list
     })
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
