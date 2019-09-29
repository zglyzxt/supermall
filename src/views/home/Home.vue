<template>
<div class="home">
<nav-bar class="home-nav">
  <div slot="center">购物街</div>
</nav-bar>
<!--  轮播图-->
  <HomeSwiper :banners="banners"></HomeSwiper>

  <RecommendView :recommends="recommends"></RecommendView>

  <feature-view></feature-view>

  <tab-control :titles="['流行','新款','精选']" class="tabControl" @tabClick="tabClick"></tab-control>

  <goods-list :goods="showGoods"></goods-list>

</div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata,getHomeGoods } from "network/home"
//default 导出才能不用大括号

export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {
     result: null,
     banners:[],
     recommends:[],
     goods: {
       'pop':{page:0,list:[]},
       'new':{page:0,list:[]},
       'sell':{page:0,list:[]}
     },
     currentType:'pop'
    }
  },
  computed: {
    showGoods() {
     return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据，这个接口包含的很多数据
      this.getHomeMultidata()
    //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听的方法
     */
     tabClick(index) {
       // console.log(index)
       switch (index) {
         case 0:
           this.currentType = 'pop'
           break
         case 1:
           this.currentType = 'new'
           break
         case 2:
           this.currentType = 'sell'
           break
       }
     },
     

  //网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list//this指的就是组件的对象，数据不会消失了
        this.recommends = res.data.recommend.list//this指的就是组件的对象，数据不会消失了
      })
    },
    getHomeGoods(type) {
    const page = this.goods[type].page + 1
      getHomeGoods(type , page).then(res=>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.home
  padding-top 44px
.home-nav
  background-color var(--color-tint)
  color #fff
  position fixed
  left 0
  right 0
  top 0
  z-index 9
.tabControl
  position sticky
  top 44px
  background-color #fff
</style>
