<template>
<div class="home">
<nav-bar class="home-nav">
  <div slot="center">购物街</div>
</nav-bar>

<Scroll class="content"
ref="scroll"
:probe-type="3"
@scroll="contentScroll"
:pull-up-load="true"
@pullingUp="loadMore"
>
    <!--  轮播图-->
    <HomeSwiper :banners="banners"></HomeSwiper>

    <RecommendView :recommends="recommends"></RecommendView>

    <feature-view></feature-view>

    <tab-control :titles="['流行','新款','精选']" class="tabControl" @tabClick="tabClick"></tab-control>

    <goods-list :goods="showGoods"></goods-list>
</Scroll>

<!--监听组件的点击 .native 监听组件根元素的原生事件-->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from "components/common/scroll/Scroll"
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods } from "network/home"

//default 导出才能不用大括号

export default {
  name: 'Home',
  components:{
    Scroll,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop
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
     currentType:'pop',
     isShowBackTop:false
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
        this.$refs.scroll.finishPullUp()
      })

    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
      // console.log(this.$refs.scroll.scrollTo(0,0))
    },
    contentScroll(position) {
      // console.log(position)
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    }

  }
}
</script>

<style scoped lang="stylus">
.home
  padding-top 44px
  height 100vh
  position relative
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
  z-index 9
.content
  /*height 'calc(100% - %s)' % 93px*/
  /*overflow hidden*/
  /*margin-top 44px*/
  overflow hidden
  position absolute
  top 44px
  bottom 49px
</style>
