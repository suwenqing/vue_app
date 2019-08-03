<template>
  <div class="first">
    <van-card  centered>
      <h3 slot="title" class="h3title">{{detail.title}}</h3>
      <div slot="num" style="color:#26a2ff">点击:{{detail.click}}次</div>
      <div slot="price" style="color:#26a2ff">发表时间:{{detail.add_time|dataFormat()}}</div>
    </van-card>

    <div class="content" >
      <p v-html="detail.content"></p>
    </div>

    <h2>发表评论：{{detail.id}}</h2>
    <van-cell-group>
      <van-field  type="textarea" v-model="inputContent" placeholder="请输入评论内容" />
    </van-cell-group>
    <van-button type="info" @click="addComment(detail.id)">发表评论</van-button>
    <comment-cart></comment-cart>


  </div>
</template>

<script>

export default {
  data() {
    return {
      uid: this.$route.params.id,
      detail: [],
      inputContent:''
    };
  },

  methods: {
    async getNewsDetail() {
      const res = await this.axios.get(`/api/getnew/${this.uid}`);
      if (res.status == 0) {
        this.detail = res.message[0];
        console.log(this.detail);
      }
    },
    async addComment(id){
        const res = await this.axios.post(`/api/postcomment/${id}`,{
            content:this.inputContent
        })
        if(res.status == 0){
            this.$store.dispatch('getCommentList',this.uid)
        }
    }
  },



  created() {
    // console.log(this.uid)
    this.getNewsDetail();
    this.$store.dispatch('getCommentList',this.uid)
  },
  computed:{

  }
};
</script>

<style lang='less' scoped>
.first{
    margin-bottom: 50px;
}
.van-card{
    .van-card__header{
        padding:0 5px 10px
    }
    background-color: #fff;
    .h3title{
        text-align: center;
        color:red;
    }
}
.content{
    color:#8f8f94
}
.van-field{
    border:1px solid #ccc;
    padding:5px;
}
.van-button{
    width: 100%;
    margin:3px;
}
</style>
