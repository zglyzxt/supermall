import {debounce} from 'common/utils'

export const itemListenerMinxin = {
  data() {
    return{
      itemImageListener:null
    }
  },
  mounted() {
    //这个地方img标签确实被挂载,但是其中的图片还没哟占据高度
    //this.$refs.scroll.refresh对这个函数进行防抖操作
    const newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImageListener = ()=> {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
    // console.log('mixin')
  }
}
