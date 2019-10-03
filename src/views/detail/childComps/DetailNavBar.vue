<template>
  <div>
<!--  导航-->
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles" :key="index" class="title-item"
          :class="{active:index === currentIndex}"
          @click="titleClick(index)"
          >
          {{item}}
        </div>
      </div>
    </nav-bar>



  </div>
</template>

<script>
  import NavBar from "components/common/navbar/navbar"
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
     return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
     }
    },
    methods: {
     titleClick(index) {
       this.currentIndex = index
       this.$emit('titleClick',index)
     },
     back() {
       this.$router.go(-1)
     }
    }
  }
</script>

<style scoped lang="stylus">
.active
 color var(--color-high-text)
.back img
 margin-top 12px
.title
  display flex
  font-size 13px
  .title-item
   flex 1
</style>
