<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">用户评价</div>
      <div class="info-more">
        更多
        <i class="arrow-right"></i>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "DetailCommentInfo",
    props:{
     commentInfo:{
       type:Object,
       default() {
         return {}
       }
     }
    }
  }
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  height:50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-title{
 float:left;
 font-size: 15px;
}
.header-more{
  float: right;
  margin-right: 10px;
  font-size: 13px;
}
</style>
