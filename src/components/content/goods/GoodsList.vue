<template>
  <div class="goods">
<!--   {{goods}}-->
   <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
  export default {
    name: "goods",
    props: {
      goods: {
        type:Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped lang="stylus">
.goods
  display flex
  flex-wrap wrap
  justify-content space-around
  padding 2px
</style>
